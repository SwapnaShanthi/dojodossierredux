const express = require( 'express');
const app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const axios = require( 'axios');

app.use(express.static("./../react-app/build/")); 

app.get("/gettablist/",(request, response)=>{

    axios.get(`http://5c99215a423656001439321e.mockapi.io/api/v1/dojodossier`)
         .then(function (mockApiDojoDossierGetResponse) {
                        return response.json({
                                data: mockApiDojoDossierGetResponse.data,
                                status:true
                            })
                    
        })
        .catch(error => {
                console.log("DojoDossierGetResponse failed"+error);
        });
    

})

app.post("/addtabitem/",(request, response)=>{
   
             axios.post(`http://5c99215a423656001439321e.mockapi.io/api/v1/dojodossier`,request.body.newTabObject)
                  .then((mockApiDojoDossierPostResponse) => {
                        console.log("update dojodossier",mockApiDojoDossierPostResponse.data);
                        return response.json({
                            status:true
                        })
                  })
                  .catch((error) => {
                       console.log("dojodossier post failed"+error);
                       return response.json({
                        status:false
                       })
                  });


}) 
app.post("/updatetabdetaillist/",(request, response)=>{
    
              axios.put(`http://5c99215a423656001439321e.mockapi.io/api/v1/dojodossier/${request.body.objToUpdate1.id}`, request.body.objToUpdate1)
                   .then((mockApiDojoDossierPutResponse) => {
                         console.log("update list dojodossier",mockApiDojoDossierPutResponse.data);
                         return response.json({
                            status:true
                        })
                   })
                   .catch((error) => {
                        console.log("dojodossier update list failed", error);
                        return response.json({
                            status:false
                        })
                   });
 
 
 })          

app.listen(5000 ,()=>{

});