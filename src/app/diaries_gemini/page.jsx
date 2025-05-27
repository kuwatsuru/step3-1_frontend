'use client'
import {useState} from "react";
import Header from "@/app/components/diary_header.jsx";
import DiaryForm from "@/app/components/diary_input.jsx";

export default function Home() {
  // 入力テキストとAPIレスポンス用の状態変数を宣言
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  // フォーム送信時の処理
  async function handleSubmit(e) {
    e.preventDefault(); // ページリロードを防ぐ
    const res = await fetch("http://localhost:8000/ai_gemini", {  // FastAPI のURL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }), // text = ユーザーの入力（日記内容）
    });

    const data = await res.json();
    setResponse(data.ai_response);
  }  
  return (
    <main>
      <Header />

      <DiaryForm 
        text={text}
        setText={setText}
        response={response}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}