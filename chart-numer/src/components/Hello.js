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


  //User input
  function submit(){
    setData([{}]);
     //baisection
    var error=bisection(xL,xR,equ);
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

  
  function setbutton(){
    var ans = evaluate(equ.replace("x",0));
  }

  return (
    <div>
      <div>
       
              <div>
                <h1> </h1>
                Funtion : <input onChange={setequ}></input>
                <button onClick={setbutton}> set </button>
              </div>
              <div>
                  XL : <input type="number" onChange={setxL}></input>XR : <input type="number" onChange={setxR}></input>
                  <button onClick={submit}>Submit</button>
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

        
      </div>

      
    </div>
  );
  

}
  

export default Chart