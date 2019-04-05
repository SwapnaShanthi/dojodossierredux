import React, { Component } from "react";
import { addToTab, updateTabDetails,addTabList} from '../redux.js';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './../style/dojodossier.css';
import axios from 'axios';

class DojoDossierMain extends Component {
    constructor(props) {
      super(props);
      this.state={addedItemName:"",
                  addedlistItem:"",
                  error:"",
                  addtaberror:"",
                  tablisterror:""
                }
    };
    retriveAll=(type)=>{
      axios.get(`http://localhost:5000/gettablist/`)
           .then((response )=> {
              this.props.addTabList(response.data.data);
              if(type=== "all"){
                this.changeClassName(this.props.tabItems[0].id)
              }else if(type=== "addTab"){
                this.changeClassName(this.props.tabItems[this.props.tabItems.length-1].id)
              }
              this.setState({tablisterror:""});
              this.setState({addtaberror:""});
              this.setState({addedItemName:""});
              this.setState({addedlistItem:""});
              this.setState({error:""});
           })
           .catch((error) => {
              this.setState({error:"Server connection failed"});
           });
    }
    componentDidMount(){
      this.retriveAll("all");
    }
    
    changeClassName=(id)=>{
      let tabcontent = document.getElementsByClassName("tabcontentdisable");
        for (let i = 0; i < tabcontent.length; i++) {
           if(tabcontent[i].id === id){
             tabcontent[i].className = tabcontent[i].className.replace("tabcontentdisable", "tabcontentactive");
           }
           
        }
        let tabcontentactive = document.getElementsByClassName("tabcontentactive");

        if(tabcontentactive.length>0){
            for (let j = 0; j < tabcontentactive.length; j++) {
                if(tabcontentactive[j].id !== id){
                   tabcontentactive[j].className = tabcontentactive[j].className.replace("tabcontentactive", "tabcontentdisable");
                }
            } 
        }
        let buttonactive = document.getElementsByClassName("tablinks");

        if(buttonactive.length>0){
            for (let k = 0; k < buttonactive.length; k++) {
                if(buttonactive[k].id === id){
                    buttonactive[k].className = buttonactive[k].className.replace("tablinks", "active");
                }
            } 
        }
        let buttoninactive = document.getElementsByClassName("active");

        if(buttoninactive.length>0){
            for (let h = 0; h < buttoninactive.length; h++) {
                if(buttoninactive[h].id !== id){
                    buttoninactive[h].className = buttoninactive[h].className.replace("active", "tablinks");
                }
            } 
        }

    } 
    addTabOnChange=()=>{
        let newTabObject={
                           id:this.props.nextID,
                           name:this.state.addedItemName,
                           tablist:[]
                         }
        //this.props.addToTab(newTabObject);
      if(this.state.addedItemName!=="") {
        axios.post(`http://localhost:5000/addtabitem/`,{newTabObject})
             .then((response) => {
              console.log("posted a the tabitem",response.data);
              this.retriveAll("addTab");
              this.setState({tablisterror:""});
              this.setState({addtaberror:""});
              this.setState({addedItemName:""});
              this.setState({addedlistItem:""});
              this.setState({error:""});
              
             })
             .catch((error) => {
                this.setState({error:"Server connection failed"});
             });
      }else{
        this.setState({addtaberror:"Please enter a value"});
      }       
    }
    updateTabListOnChange=(item)=>{
       /* let objToUpdate={ id:item.id,
                          newItemlist: this.state.addedlistItem
                        }
                        console.log("objToUpdate",objToUpdate)
          this.props.updateTabDetails(objToUpdate);*/
      if(this.state.addedlistItem!==""){    
          let objToUpdate1={ id:item.id,
              name:item.name,
              tablist:item.tablist

          }
          objToUpdate1.tablist.push(this.state.addedlistItem);
          axios.post(`http://localhost:5000/updatetabdetaillist/`,{objToUpdate1})
              .then((response) => {
                console.log("posted a the tabitem",response.data);
                this.retriveAll("updatetablist");
                this.setState({tablisterror:""});
                this.setState({addtaberror:""});
                this.setState({addedItemName:""});
                this.setState({addedlistItem:""});
                this.setState({error:""});
              })
              .catch((error) => {
                  this.setState({error:"Server connection failed"});
              });   
        }else{
          this.setState({tablisterror:"Please enter a value"});
        }      

    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
        this.setState({tablisterror:""});
        this.setState({addtaberror:""});
    }

    render() {
      const error=() => {
        if(this.state.error!==""){
          return <div className="errormessagediv">{this.state.error}</div>
        }
       } 
       const addtaberror=() => {
        if(this.state.addtaberror!==""){
          return <div className="errormessagediv">{this.state.addtaberror}</div>
        }
       } 
       const tablisterror=() => {
        if(this.state.tablisterror!==""){
          return <div className="errormessagediv">{this.state.tablisterror}</div>
        }
       }
      
      const displayTab= this.props.tabItems.map((items,index)=>{
         return (
                    <div className="tab">
                        <button id={items.id} className="tablinks" onClick={()=>{this.changeClassName(items.id)}}>{items.name}</button>
                    </div>
         )

      })
      const displayDetails= this.props.tabItems.map((items,index)=>{
        let tabList=null;
        if(items.tablist.length>0){
            tabList=items.tablist.map((tablistitem,tablistindex)=>{
                return (
                
                        <p><span className="spanstyle">*</span><span>{tablistitem}</span></p> 
                
                )

            })
        }
        return (
            <div id={items.id} className="tabcontentdisable">
                  {tabList}
                  <div className="inputbottomdiv">
                     {tablisterror()}
                    <input className="inputbottomboxstyle" onChange={this.handleChange} value={this.state.addedlistItem} type="text" name="addedlistItem" placeholder="Enter Task" />
                    <button onClick={()=>{this.updateTabListOnChange(items)}} className="bottombuttonstyle" type="button" >Add</button>
                 </div>
             </div>

        )

     })
    

      return (
        <div className="outerdiv">
            <h1>Dojo Dossier</h1>
             <div className="inputtopdiv">
                   {addtaberror()}
                    <input className="inputtopboxstyle" onChange={this.handleChange} value={this.state.addedItemName} type="text" name="addedItemName" placeholder="Title" />
                    <button onClick={()=>{this.addTabOnChange()}} className="topbuttonstyle" type="button" >Add</button>
            </div>
            {error()}
            <div className="displaytab">
               {displayTab}
            </div>
            <div className="displaydetails">
               {displayDetails}
            </div>
           
      </div>
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    tabItems:state.tabItems,
    nextID:state.nextID
  })
  
  const mapDispatchToProps = (dispatch) => ({
    addToTab: (payload) => dispatch(addToTab(payload)),
    updateTabDetails: (payload) => dispatch(updateTabDetails(payload)),
    addTabList:(payload) => dispatch(addTabList(payload))
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DojoDossierMain);