"use client";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "示例歌曲",
      cover: "https://picsum.photos/200/300",
      url: "https://baidu.com",
      type: "song",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [pwd, setPwd] = useState("");
  const password = "123456";

  const addItem = (title, cover, url, type) => {
    setItems([
      ...items,
      { id: Date.now(), title, cover, url, type },
    ]);
  };

  const del = (id) => {
    setItems(items.filter(i => i.id !== id));
  };

  const filtered = items.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", background: "#111", color: "#fff", minHeight: "100vh" }}>
      <h1>我的资源主页</h1>

      <input
        placeholder="搜索歌曲/小说..."
        style={{ width: "100%", padding: "10px", margin: "10px 0", background: "#222", color: "#fff", border: "none" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {!showAdmin ? (
        <div>
          <input
            placeholder="管理员密码"
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            style={{ padding: "8px", marginRight: "5px" }}
          />
          <button onClick={() => pwd === password && setShowAdmin(true)}>
            登录管理
          </button>
        </div>
      ) : (
        <button onClick={() => {
          const title = prompt("名称");
          const cover = prompt("封面链接");
          const url = prompt("跳转网址");
          const type = prompt("类型 song/novel/video/image");
          title && cover && url && addItem(title, cover, url, type);
        }} style={{ background: "red", color: "#fff", padding: "10px 20px", borderRadius: "30px", position: "fixed", bottom: "20px", right: "20px" }}>
          + 发布作品
        </button>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "20px" }}>
        {filtered.map((item) => (
          <div key={item.id} style={{ background: "#222", borderRadius: "10px", overflow: "hidden" }}>
            <img
              src={item.cover}
              onClick={() => window.open(item.url)}
              style={{ width: "100%", height: "120px", objectFit: "cover", cursor: "pointer" }}
            />
            <div style={{ padding: "8px", fontSize: "14px" }}>{item.title}</div>
            {showAdmin && (
              <button onClick={() => del(item.id)} style={{ background: "red", color: "#fff", fontSize: "12px", padding: "4px", margin: "4px" }}>
                删除
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
