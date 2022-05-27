import Item from "./Item";
const Transaction= ()=>{
    const datas = [
        {title: "ค่ารักษา", amount:20000},
        {title: "ค่าบ้าน", amount:480},
        {title: "ค่าหมา", amount:40},
        {title: "ค่าประกัน", amount:200},
    ]
    return (
      <div>
        <h2> โปรแกรม </h2>
        <p> รายระเอียดตั่งๆ</p>
        <ul>
            {datas.map((element)=>{
                //return <Item title={datas[0].title} amount = {datas[0].amount}/>
                return <Item title ={element.title} amount={element.amount} />
            })}
            
        </ul>
      </div>
    );
  }
  export default Transaction