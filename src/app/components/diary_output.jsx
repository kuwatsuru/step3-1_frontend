export default function DiaryForm() {
    return (
        <div style={{
            positon: "fixed",
            bottom: 0,
            width: "100%",
            padding: 20,
            backgroundColor: "white", 
        }}
        >

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >   
                <textarea
                    placeholder="今日の出来事や感情を思うがまま記入してください"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                        width: "100%",
                        height: "200px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                    }}
                    maxLength={10000} // 10000文字まで入力可能
                />
                <button 
                    type="submit"
                    style={{    
                        width: "10%",
                        padding: "10px 15px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    保存
                </button>
            </form>
                <div>
                    {response && (
                        <div style={{ marginTop: "20px", color: "green" }}>
                            <strong>API Response:</strong> {response}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}