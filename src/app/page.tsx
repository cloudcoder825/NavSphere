"use client";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState([
    {id:1,title:"示例歌曲",cover:"https://picsum.photos/200/300",url:"https://www.baidu.com",type:"song"}
  ]);
  const [search, setSearch] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [pwd, setPwd] = useState("");
  const password = "123456";

  const addItem = (title, cover, url, type)=>{
    setItems([...items,{id:Date.now(),title,cover,url,type}])
  }
  const delItem = (id)=> setItems(items.filter(v=>v.id!==id))
  const list = items.filter(item=>item.title.includes(search))

  return (
    <div style={{background:"#111",color:"#fff",padding:"20px",minHeight:"100vh"}}>
      <h2>资源导航主页</h2>
      <input placeholder="搜索名称" value={search} onChange={e=>setSearch(e.target.value)} style={{width:"100%",padding:"10px",margin:"10px 0"}}/>
      {!showAdmin?(
        <div>
          <input placeholder="管理员密码" value={pwd} onChange={e=>setPwd(e.target.value)} style={{padding:"6px"}}/>
          <button onClick={()=>pwd===password&&setShowAdmin(true)}>登录</button>
        </div>
      ):(
        <button style={{position:"fixed",bottom:"20px",right:"20px",background:"red",padding:"8px 16px",borderRadius:"20px"}} onClick={()=>{
          const name=prompt("作品名");
          const img=prompt("封面链接");
          const link=prompt("跳转网址");
          const type=prompt("分类");
          if(name&&img&&link) addItem(name,img,link,type)
        }}>+发布作品</button>
      )}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px",marginTop:"20px"}}>
        {list.map(item=>(
          <div key={item.id} style={{background:"#222",borderRadius:"8px",overflow:"hidden"}}>
            <img src={item.cover} onClick={()=>window.open(item.url)} style={{width:"100%",height:"140px",objectFit:"cover"}}/>
            <div style={{padding:"8px"}}>{item.title}</div>
            {showAdmin&&<button onClick={()=>delItem(item.id)} style={{background:"red",margin:"6px"}}>删除</button>}
          </div>
        ))}
      </div>
    </div>
  )
}
