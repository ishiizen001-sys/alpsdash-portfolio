# Architecture

このポートフォリオ版は、実運用システムの設計思想を安全に説明するために簡略化しています。

## Decision flow

```text
Raw operational data
        ↓
Normalization / validation
        ↓
KPI aggregation
        ↓
Dashboard
        ↓
Comparison / anomaly detection
        ↓
Operational insight
        ↓
Human decision / action
```

## Portfolio demo

```text
demo-data/dashboard.json
        ↓
app.js
        ↓
KPI cards / store status / product ranking
        ↓
rule-based insights / data-quality indicators
```

公開版では、外部サービス、認証基盤、実データストレージ、通知先、社内固有のマスタや処理ルールを意図的に除外しています。

## Production-oriented design represented by the demo

実運用を想定した設計では、次の責務を分離します。

1. **Ingestion** — 元データを取り込む
2. **Normalization** — データ形式・コード体系を揃える
3. **Quality control** — 欠損、未一致、異常値を検出する
4. **Aggregation** — 日次・週次・月次のKPIへ変換する
5. **Presentation** — 現場が判断可能な形で表示する
6. **Decision support** — 数値の変化から確認ポイントを提示する

重要なのは、可視化そのものではなく、**「何を見れば、次に何を判断できるか」までをデータ設計に含めること**です。
