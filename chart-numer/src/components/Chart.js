/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-redeclare */
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {evaluate,derivative} from 'mathjs'
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box } from '@mui/system';
import axios from 'axios';
    
function Chart(){
  
  const [xL,setXL] = useState();
  const [xR,setXR] = useState();
  const [equ,setEqu]= useState();
  const [Xnewton,setX]= useState();
  const [XoneP,setXonePoin]= useState();

  const [xlEx,setxlEx] = useState();
  const [xrEx,setxrEx] = useState();
  const [equEx,setequEx]= useState();
  const [xEx,setxEx] = useState();


  const [data,setData] = useState([{}]);
  const [topic,settopic]= useState('1');

  reqData();
  /*function reqData(){
   axios.get('http://localhost:8080/data').then(res=>{
      let data = res.data;
      data.forEach(val=>{
        if((val.id == topic )&&(val.id=="1")){ //set Bisection example
          setequEx(val.equation);
          setxlEx(val.xl);
          setxrEx(val.xr);
        }
        else if((val.id==topic )&&(val.id=="2")){ //set False-Position
          setequEx(val.equation);
          setxlEx(val.xl);
          setxrEx(val.xr);
        }else if((val.id==topic )&&(val.id=="3")){ //set ONE-POINT
          setequEx(val.equation);
          setxEx(val.x);
        }else if((val.id==topic )&&(val.id=="4")){//set Newton raphson example
          setequEx(val.equation);
          setxEx(val.x);
        }
        
      }) 
    })  
  }*/
  
  function reqData(){ 
    const token="eyJhbGciOiJIUzI1NiJ9.cmVx.rVQZ97Nmci9nD5TSf7ITGGXYyc_YHVqwTY34j-gW3OY";

    if (topic=='1'){
      const authAxios = axios.create({
        baseUrl: "http://localhost:8080/data/1",
        headers: {
            Authorization: `Bearer ${token}`, 
        }
      })
      authAxios.get('http://localhost:8080/data/1').then(res=>{
        let data = res.data;
        data.forEach(val=>{
          setequEx(val.equation);
          setxlEx(val.xl);
          setxrEx(val.xr);
        })
      })
    }
    else if (topic=='2'){
      const authAxios = axios.create({
        baseUrl: "http://localhost:8080/data/2",
        headers: {
            Authorization: `Bearer ${token}`, 
        }
      })
      authAxios.get('http://localhost:8080/data/2').then(res=>{
        let data = res.data;
        data.forEach(val=>{
          setequEx(val.equation);
          setxlEx(val.xl);
          setxrEx(val.xr);
        })
      })
    }else if(topic=='3'){
      const authAxios = axios.create({
        baseUrl: "http://localhost:8080/data/3",
        headers: {
            Authorization: `Bearer ${token}`, 
        }
      })
      authAxios.get('http://localhost:8080/data/3').then(res=>{
        let data = res.data;
        data.forEach(val=>{
          setequEx(val.equation);
          setxEx(val.x);
        })
      })
    }else if (topic=='4'){
      const authAxios = axios.create({
        baseUrl: "http://localhost:8080/data/4",
        headers: {
            Authorization: `Bearer ${token}`, 
        }
      })
      authAxios.get('http://localhost:8080/data/4').then(res=>{
        let data = res.data;
        data.forEach(val=>{
          setequEx(val.equation);
          setxEx(val.x);
        })
      })
    }
  }
  
  function bisection(xL,xR,equ){
    console.log(equ)
    var xLtemp = parseFloat(xL);  //ฟังก์ชั่นแยกวิเคราะห์สตริง
    var xRtemp = parseFloat(xR);
    var error=0.0000001;
    var check = 1;
    var oldxL=xLtemp;
    var oldxR=xRtemp;
    var x=[];
    var y=[];
    var errors=[];
    while (check >= error) {
    // xL , xR
        console.log("xL=",xL);
        var fxL = evaluate(equ.replace("x",xLtemp));
        console.log("fxL=",fxL);
        var fxR = evaluate(equ.replace("x",xRtemp));
        console.log("xR=",xR);
        console.log("fxR=",fxR);
        //xM
        console.log(xLtemp+xRtemp);
        var xM = (xLtemp+xRtemp)/2;
        var fxM = evaluate(equ.replace("x",xM));
        console.log("xM=",xM);
        console.log("fxM=",fxM);
        var testCase = fxM*fxR;
        if(testCase>0){ //CaseA
            oldxR=xRtemp;
            xRtemp=xM;
            check = Math.abs((xRtemp-oldxR)/xRtemp);
        }else if(testCase<0){ //CaseB
            oldxL=xLtemp;
            xLtemp=xM;
            check = Math.abs((xLtemp-oldxL)/xLtemp);
        }else{
          x.push(xM.toFixed(6));
          y.push(check.toFixed(6));
          break;
        }
        //console.log(check);
        console.log("=====");
        x.push(xM.toFixed(6));
        y.push(check.toFixed(6));
    }
    console.log("Error=",y);
    return y;
  }
  function FalsePosition(xL,xR,equ){
    //console.log(equ)
    var error=0.0000001;
    var check = 1;
    var xLtemp = parseFloat(xL);  //ฟังก์ชั่นแยกวิเคราะห์สตริง
    var xRtemp = parseFloat(xR);
    var oldxL=xLtemp;
    var oldxR=xRtemp;
    var x=[];
    var y=[];
    var errors=[];

    while (check >= error) {
      //xl,xr
        var fxL= evaluate(equ.replace("x",xLtemp));
        var fxR= evaluate(equ.replace("x",xRtemp));
        console.log("xLtemp",xLtemp)
        console.log("xLtemp=",xLtemp);
        console.log("fxR=",fxR);
        console.log("fxL=",fxL);
        var x1=(xLtemp*fxR)-(xRtemp*fxL);
        var x1 = x1/(fxL-fxR);
        console.log(x1);
        var fx1 = evaluate(equ.replace("x",x1));
        var testCase = fx1*fxR;
        if(testCase>0){ //CaseA
            oldxR=xRtemp;
            xRtemp=x1;
            check = Math.abs((xRtemp-oldxR)/xRtemp);
        }else if(testCase<0){ //CaseB
            oldxL=xLtemp;
            xLtemp=x1;
            check = Math.abs((xLtemp-oldxL)/xLtemp);
        }else{
          x.push(x1.toFixed(6));
          y.push(check.toFixed(6));
          break;
        }
        x.push(x1.toFixed(6));
        y.push(check.toFixed(6));
    }
    console.log("Error=",y);
    return y;
  }
  function OnePointIteration(XoneP,equ){
    var epsilon=0.0000001;
    var check=1;
    var Error=[];
    var x0=parseFloat(XoneP);
    var i=0;
    while(true){
        if(check<epsilon){
            break;
        }
        var x1 = evaluate(equ.replace("x",x0)) //2 - Math.exp(x0/4);
        console.log("x1=",x1);
        var check = Math.abs((x1-x0)/x1);
        var x0 = x1;
        Error.push(check.toFixed(6));
        i++;
    }
    console.log("Error=",Error);
    return Error;
  }
  function newton(Xnewton,equ){
    const Error=[];
    let Xtemp=Xnewton;
    let a = 0.000001 ,ans= 1;
    while(ans>=a){
      let fx = evaluate(equ.replace("x",Xtemp));
      console.log("fx=",equ.replace("x",Xtemp));
      let fxdif = derivative(equ, 'x').evaluate({x: Xtemp}) ;
      let newX = Xtemp-(fx/fxdif);
      ans = Math.abs((newX-Xtemp))/newX;
      Xtemp=newX;
      console.log("x=",Xtemp)

      Error.push(ans.toFixed(6))
      console.log("error=",Error)
    }
    return Error;
  }

  function callapi(){ //API !!&&^^
    setData([{}]);
    var error=[];
    if(topic=="1"){
      error = bisection(xlEx,xrEx,equEx);
    }else if(topic=="2"){
      error = FalsePosition(xlEx,xrEx,equEx);
    }else if(topic=="3"){
      error = OnePointIteration(xEx,equEx);
    }else if(topic=="4"){
      error = newton(xEx,equEx);
    }
    //Array Error (DATA FOR GRAPH)
    const xy = error.map((id,index)=>{
      let xyObject = {};
      xyObject.iteration = "iteration "+(index+1);
      xyObject.error= error[index];
      return xyObject;
    })
    setData(xy);
  }
  //User input
  function submit(){
    setData([{}]);
    if(topic=='1'){ //baisection
      var error=bisection(xL,xR,equ);
    }else if (topic=='2'){//FalsePosition
      var error=FalsePosition(xL,xR,equ);
    }else if (topic=='3'){//Newton
      var error=OnePointIteration(XoneP,equ);
    }else if (topic=='4'){//Newton
      var error=newton(Xnewton,equ);
    }
    const xy = error.map((id,index)=>{
      let xyObject = {};
      xyObject.iteration = "iteration "+(index+1);
      xyObject.error= error[index];
      return xyObject;
    })
    setData(xy);
  }
  function setxL(evt){
    setXL(evt.target.value);
  }
  function setxR(evt){
    setXR(evt.target.value);
  }
  function setequ(evt){
    setEqu(evt.target.value)
  }
  function setx(evt){
    setX(evt.target.value)
  }
  function setXop(evt){
    setXonePoin(evt.target.value)
  }
  
  function setbutton(){
    console.log(equ);
    var ans = evaluate(equ.replace("x",0));
    console.log(ans);
  }
  const changetoppichandle=(evt,newvalue)=>{
    settopic(newvalue)
    reqData();
    setData([{}]);
  }
  return (
    <div>
      <div>
        <TabContext value={topic}>
          
        <Box>
          <TabList onChange={changetoppichandle}>
              <Tab label='Bisection' value= "1" > </Tab>
              <Tab label= 'False-Position' value="2"> </Tab>
              <Tab label='One-Poin Interation' value="3"> </Tab>
              <Tab label='Newton Raphson ' value="4"> </Tab>
            </TabList>
          </Box>

          <TabPanel value="1"> {/*Bisection Panel*/}
              <div>
                <h1> </h1>
                Equ : <input onChange={setequ}></input>
                <button onClick={setbutton}> set </button>
              </div>
              <div>
                  XL : <input type="number" onChange={setxL}></input>XR : <input type="number" onChange={setxR}></input>
                  <button onClick={submit}>Submit</button>
                  <button onClick={callapi}>callapi</button>
                  <h1> </h1>

              </div>

              <LineChart
                  width={1000}
                  height={400}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
              >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="iteration" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="error"stroke="#8884d8" />
              </LineChart>

          </TabPanel>
          <TabPanel value="2"> {/*False-Position*/}
              <h1></h1>
              <div>
                  Equ : <input onChange={setequ}></input>
                  <button onClick={setbutton}> set </button>
              </div>
              <div>
                    XL : <input type="number" onChange={setxL}></input>XR : <input type="number" onChange={setxR}></input>
                    <button onClick={submit}>Submit</button>
                    <button onClick={callapi}>callapi</button>
                    <h1> </h1>
              </div>
              <LineChart
                  width={1000}
                  height={400}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
              >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="iteration" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="error"stroke="#8884d8" />
              </LineChart>
          </TabPanel>

          <TabPanel value="3">  {/*one poin*/}
            <h1> </h1>
            <div>
                Equ : <input onChange={setequ}></input>
                <button onClick={setbutton}> set </button>
            </div>
            <div>
              X : <input type="number" onChange={setXop}></input>
              <button onClick={submit}>Submit</button>
              <button onClick={callapi}>callapi</button>
              <h1> <> Ex : 2-e^(x/4)</> </h1>
            </div>
            <LineChart
                    width={1000}
                    height={400}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="iteration" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="error"stroke="#82ca9d" />
            </LineChart>
          </TabPanel>

          <TabPanel value="4"> {/*newton*/}
            <h1>  </h1>
            <div>
                Equ : <input onChange={setequ}></input>
                <button onClick={setbutton}> set </button>
            </div>
            <div>
                X : <input type="number" onChange={setx}></input>
                <button onClick={submit}>Submit</button>
                <button onClick={callapi}>callapi</button>
                <h1> </h1>
            </div>
            <LineChart
                width={1000}
                height={400}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="iteration" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line type="monotone" dataKey="error"stroke="#82ca9d" />
            </LineChart>
          </TabPanel>
        </TabContext>
        
      </div>

      
    </div>
  );
  

}
  

export default Chart