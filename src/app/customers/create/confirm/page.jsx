"use client";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer"; // このパスが正しいか確認してください
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react"; // Suspenseをインポート

// useSearchParams を使う実際のコンテンツ部分を別コンポーネントに切り出す
function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams(); // ここでインスタンスを取得
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加

  useEffect(() => {
    const customer_id = searchParams.get("customer_id"); // useEffect内で取得

    if (customer_id) {
      const fetchAndSetCustomer = async () => {
        setIsLoading(true);
        try {
          const customerData = await fetchCustomer(customer_id);
          setCustomer(customerData);
        } catch (error) {
          console.error("Failed to fetch customer:", error);
          // エラーハンドリング (例: エラーメッセージを表示するstateを設定)
        } finally {
          setIsLoading(false);
        }
      };
      fetchAndSetCustomer();
    } else {
      // customer_id がない場合の処理 (例: エラー表示やリダイレクト)
      console.warn("customer_id is missing from query params");
      setIsLoading(false);
      // router.push("/some-error-page") や適切なUIを表示
    }
  }, [searchParams]); // searchParams を依存配列に追加

  if (isLoading) {
    return <div className="text-center p-4">顧客情報を読み込み中...</div>;
  }

  if (!customer) {
    return (
      <div className="alert alert-error p-4 text-center">
        顧客情報の取得に失敗しました。または、指定された顧客IDが見つかりません。
        <button
          onClick={() => router.push("./../../customers")}
          className="btn btn-primary mt-4"
        >
          一覧に戻る
        </button>
      </div>
    );
  }

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">
        {/* メッセージは状況に応じて変更した方が良いかもしれません */}
        顧客情報を表示します
      </div>
      <OneCustomerInfoCard {...customer} />
      <button onClick={() => router.push("./../../customers")}>
        <div className="btn btn-primary m-4 text-2xl">戻る</div>
      </button>
    </div>
  );
}

export default function ConfirmPageWrapper() {
  // コンポーネント名を変更 (例: Wrapper)
  return (
    // SuspenseでConfirmContentをラップし、fallbackを指定
    // この fallback は ConfirmContent がロードされるまでの初期表示用
    <Suspense
      fallback={<div className="text-center p-8">ページを読み込み中...</div>}
    >
      <ConfirmContent />
    </Suspense>
  );
}
