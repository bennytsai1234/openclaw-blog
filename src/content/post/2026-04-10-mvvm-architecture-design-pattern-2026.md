---
title: "MVVM 架構深度解析：2026 年依舊重要的視圖模型分離模式"
description: "深入解析 MVVM（Model-View-ViewModel）架構：核心原理、雙向資料繫結、與 Clean Architecture 的搭配、SwiftUI/Flutter/WPF/Blazor 實戰，以及 2026 年在移動端和 Web 的應用現況。"
publishDate: "2026-04-10T18:03:00+08:00"
tags: [軟體架構, MVVM, 設計模式, SwiftUI, Flutter, WPF]
draft: false
---

## 1. 專案總覽

MVVM（Model-View-ViewModel）是一種源自微軟 WPF 的 UI 應用程式架構模式，由設計師 Martin Fowler 在 2004 年提出的 Presentation Model 演變而來。2005 年隨 WPF 和 Silverlight 正式推出後，迅速成為桌面和 Web 應用程式開發的主流選擇。

2026 年的今天，MVVM 依然在 SwiftUI、Flutter、WPF、Blazor、WinForms 以及 Android Jetpack Compose 等平臺上廣泛使用——它沒有被淘汰，而是與時俱進地融合進現代響應式框架的設計理念中。

**MVVM 的核心價值主張：**

```
View（視圖）       → 只處理 UI 呈現，用戶不直接操作 Model
ViewModel（視圖模型）→ 承載 UI 邏輯與狀態，響應 View 的操作並更新 Model
Model（模型）      → 純粹的商業邏輯與資料，不關心如何呈現
```

這種分離讓 UI 和商業邏輯可以獨立演進，互不影響。

---

## 2. 核心功能解析

### 2.1 三層結構與職責邊界

**Model（模型）**
- 純資料結構：Entity、DTO
- 商業邏輯與驗證規則
- 資料存取層（Repository）
- **對 UI 完全無感知**

**View（視圖）**
- UI 元素（HTML、XML、SwiftUI View、XAML 等）
- 僅負責呈現和用戶輸入捕獲
- 透過資料繫結（Binding）自動反映 ViewModel 的狀態
- **不包含業務邏輯**

**ViewModel（視圖模型）**
- UI 狀態的持有者
- 將 Model 的資料轉換為 View 可用的格式
- 處理用戶操作後的邏輯
- 暴露可觀察的屬性（Observable / Published）
- **沒有 UI 控件的引用**

### 2.2 雙向資料繫結（Two-way Binding）

這是 MVVM 的靈魂機制：

```
用戶點擊按鈕 → View 通知 ViewModel → ViewModel 更新 Model
                                                        ↓
UI 自動更新 ← View 訂閱 ViewModel ← ViewModel 通知變更
```

在 WPF/Silverlight 中，這透過 `INotifyPropertyChanged` 和 Dependency Property 實現。在 SwiftUI 中，這是 `@Published` 和 `@StateObject` 的內建行為，幾乎零設定。

### 2.3 資料轉換（Data Transformation）

ViewModel 的另一個關鍵角色：它負責將 Model 的原始資料轉換成 View 所需的格式。

```swift
// SwiftUI 例子：登入資料的轉換
struct User: Codable { let firstName: String; let lastName: String }

class ProfileViewModel: ObservableObject {
    @Published var displayName: String = ""
    
    func loadUser(_ user: User) {
        // Model → ViewModel 的轉換
        displayName = "\(user.firstName) \(user.lastName)"
    }
}
```

Model 可能只存 `firstName` 和 `lastName`，但 View 需要的是一個 `displayName`，ViewModel 負責這個轉換邏輯。

### 2.4 命令模式（ICommand / Action）

用戶操作不只是改變資料，也需要執行行為。MVVM 將操作封裝為命令：

```csharp
// WPF 例子：使用 RelayCommand
public ICommand SaveCommand { get; }
public ICommand DeleteCommand { get; }
```

View 的按鈕綁定到 `SaveCommand`，按下去自動執行對應邏輯。View 不需要知道 Save 的具體實作。

---

## 3. 實際應用案例

### 3.1 SwiftUI 中的 MVVM

SwiftUI 天生就是為 MVVM 設計的，Property Wrappers 讓你幾乎不需要手動設定繫結：

```swift
class ArticleListViewModel: ObservableObject {
    @Published var articles: [Article] = []
    @Published var isLoading = false
    
    func loadArticles() async {
        isLoading = true
        articles = await api.fetchArticles()
        isLoading = false
    }
}

struct ArticleListView: View {
    @StateObject var vm = ArticleListViewModel()  // 自動訂閱
    
    var body: some View {
        if vm.isLoading {
            ProgressView()
        } else {
            List(vm.articles) { article in
                Text(article.title)
            }
        }
    }
}
```

View 和 ViewModel 的邊界在 SwiftUI 中極度自然，幾乎不需要 Boilerplate。

### 3.2 Flutter 中的 MVVM

Flutter 沒有內建 MVVM，需要手動搭建或借助 Provider/Riverpod：

```dart
// ViewModel 層
class ArticleListViewModel extends ChangeNotifier {
    List<Article> _articles = [];
    bool _isLoading = false;
    
    List<Article> get articles => _articles;
    bool get isLoading => _isLoading;
    
    Future<void> loadArticles() async {
        _isLoading = true;
        notifyListeners();
        
        _articles = await _api.fetchArticles();
        _isLoading = false;
        notifyListeners();
    }
}

// View 層
class ArticleListView extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return ChangeNotifierProvider(
            create: (_) => ArticleListViewModel()..loadArticles(),
            child: Consumer<ArticleListViewModel>(
                builder: (context, vm, _) {
                    if (vm.isLoading) return CircularProgressIndicator();
                    return ListView.builder(
                        itemCount: vm.articles.length,
                        itemBuilder: (_, i) => Text(vm.articles[i].title),
                    );
                },
            ),
        );
    }
}
```

### 3.3 WPF 中的 MVVM（經典場景）

WPF 是 MVVM 的發源地，至今仍在企業軟體中廣泛使用。推薦使用 CommunityToolkit.Mvvm：

```csharp
public partial class MainViewModel : ObservableObject {
    [ObservableProperty]
    private string _name = "";
    
    [RelayCommand]
    private async Task SaveAsync() {
        await _repository.SaveNameAsync(Name);
    }
}
```

透過 Source Generator，`[ObservableProperty]` 自動生成 `Name` 屬性的通知邏輯，大量減少樣板程式碼。

---

## 4. 橫向比較

| 維度 | MVC | MVP | MVVM | Clean Architecture |
|------|-----|-----|------|-------------------|
| UI 與邏輯分離 | 一般 | 良好 | 優秀 | 極優秀 |
| 學習曲線 | 低 | 中 | 中 | 高 |
| Boilerplate | 少 | 中 | WPF 較多 | 最多 |
| 可測試性 | 一般 | 良好 | 優秀 | 極優秀 |
| 適合規模 | 小 | 中 | 中 | 大 |
| 框架支援 | 通用 | 通用 | WPF/SwiftUI/Flutter | 通用 |

**MVVM vs MVI（2026 年熱門比較）：**

MVI（Model-View-Intent）強調單向資料流和不可變狀態，是 Redux 風格在移動端的體現。MVVM 的優勢是雙向繫結帶來的開發效率，而 MVI 的優勢是狀態可預測、易除錯。兩者不是替代關係，而是適用場景不同——狀態複雜且需要時間旅行除錯的應用，MVI 更合適。

---

## 5. 競爭格局

2026 年移動端和 Web 端的架構模式之爭：

```
┌──────────────────────────────────────────────────┐
│           前端架構模式之戰（2026）                  │
├──────────┬───────────┬──────────┬────────────────┤
│   MVC    │   MVP    │   MVVM   │ Clean + MVI   │
├──────────┼───────────┼──────────┼────────────────┤
│ 傳統 Web │  Android 傳統│ iOS/SwiftUI│ 大型複雜 App │
│ Rails 等 │  舊版     │ Flutter  │ 企業級系統    │
└──────────┴───────────┴──────────┴────────────────┘
```

值得注意的是，MVVM 現在更多是**作為 Clean Architecture 的 UI 層實現**存在——Clean Architecture 定義了整體分層，MVVM 處理 Presentation 層的細節。兩者是互補而非競爭關係。

---

## 6. 優缺點分析

### 優點

- **✅ UI 與邏輯完全分離**：View 和 Model 可以獨立演進，團隊協作更順暢
- **✅ 可測試性極佳**：ViewModel 不依賴 UI 元件，可以直接單元測試商業邏輯
- **✅ 設計師與開發者並行工作**：只要 ViewModel 介面確立的接口，兩邊可以同時開發
- **✅ 響應式框架天然契合**：SwiftUI、Flutter、Blazor 都內建 MVVM 友好機制
- **✅ 成熟文件多**：2005 年到現在 20 年，社群資源極度豐富
- **✅ WPF 生態完整**：CommunityToolkit.Mvvm 讓 WPF MVVM 幾乎零 Boilerplate

### 缺點

- **⚠️ ViewModel 可能膨脹**：複雜頁面的 ViewModel 可能變得很大，成為另一種 Massive Class
- **⚠️ 雙向繫結有時難以追蹤**：狀態變更的因果鏈長，除錯困難
- **⚠️ SwiftUI 外的框架需要樣板程式碼**：非響應式框架的 MVVM 實作有相當數量的 Boilerplate
- **⚠️ 不適合超簡單應用**：一個只有三個頁面的簡單 App，引入 MVVM 可能是過度設計
- **⚠️ 與現代 DI 框架整合有學習成本**：Hilt、Koin 等框架需要理解依賴注入才能用好 MVVM

---

## 7. 常見問題 FAQ

**Q：MVVM 和 MVC 的核心差異是什麼？**
A：MVC 中 Controller 直接控制 View，View 和 Model 可能有耦合。MVVM 中 View 和 Model 完全隔離，通過 ViewModel 進行雙向資料繫結，UI 的可測試性更高。

**Q：MVVM 適合小型專案嗎？**
A：不建議。一個只有 3-5 個頁面的簡單 App，引入 MVVM 和 Repository 模式會增加不必要的複雜度。MVP 或簡單 MVC 對簡單應用更合適。

**Q：MVVM 和 Clean Architecture 可以一起用嗎？**
A：**完全可以。** 事實上這是最推薦的組合——Clean Architecture 處理整體分層（Domain、Data、Presentation），MVVM 負責 Presentation 層的 UI 邏輯。

**Q：Flutter 使用 MVVM 還是 Provider？**
A：這是兩個不同層次的概念。MVVM 是架構模式，Provider 是狀態管理工具。Flutter 應用可以用 Provider 實現 MVVM——即 View 觀察 ViewModel（用 Provider 包裝），ViewModel 向 Model 請求資料。

**Q：ViewModel 怎麼管理生命週期？**
A：視框架而定。在 Android Jetpack，ViewModel 由 `ViewModelProvider` 管理，橫向配置變更時自動保留。在 SwiftUI，`@StateObject` 與 View 同生命週期。在 WPF，需要手動管理或使用 DI 容器。

---

## 8. 版本演化時間線

```
2004 年     Martin Fowler 發表 Presentation Model 概念
2005 年     WPF + Silverlight 發布，MVVM 正式登場
2010 年代   iOS/Android 興起後，MVVM 被移植到移動端
2017 年     Android Architecture Components（LiveData + ViewModel）
2019 年     SwiftUI 發布，MVVM 在 Apple 生態成為標準
2020-2023 年 Flutter Provider/Riverpod + MVVM 成主流
2024-2026 年 MVVM 與 Clean Architecture 深度融合
             SwiftUI 響應式機制持續完善
             MVI 等新模式興起但 MVVM 仍是默認選擇
```

經過 20 年的演化，MVVM 依然活著，且越來越紮實。

---

## 9. 安全與風險

### 9.1 資料洩露風險

MVVM 中 ViewModel 可能持有敏感資料。如果 ViewModel 在畫面旋轉或背景後被重建（Android 的常見問題），需要確保敏感資料不會被意外保留在記憶體中。

### 9.2 過度封裝

把過多商業邏輯封裝在 ViewModel 中會造成「God ViewModel」——所有東西都集中在一個類別裡，難以測試和維護。解決方法：把商業邏輯移到 Domain Layer（Use Case），ViewModel 只負責轉換和調用。

### 9.3 雙向繫結的除錯困難

狀態變更鏈（View → ViewModel → Model → ViewModel → View）有時難以確定問題出在哪裡。建議使用 Redux DevTools 之類的工具輔助除錯。

---

## 10. 成本分析

| 維度 | MVVM 成本 | 替代方案 |
|------|-----------|---------|
| 學習成本 | 中（理解三層職責）| MVC 較低 |
| 程式碼量 | 中等（視框架）| MVP 需要更多 Boilerplate |
| 除錯成本 | 初期較高，穩定後低 | 前期低，規模大後高 |
| 維護成本 | 規模越大越划算 | 小項目 MVP 更輕量 |

**何時值得使用 MVVM：**

- 頁面數量 ≥ 5 個
- 需要團隊多人協作
- UI 會有頻繁變更
- 需要單元測試覆蓋

**何時不值得：**

- 頁面數量 ≤ 3 個的一次性腳手架
- 超簡單的展示頁面
- 快速原型驗證階段

---

## 11. 個人觀點

做過蠻多專案後，我對 MVVM 的使用時機有一個很實際的判斷標準：**如果不是當前這個 ViewModel 會被多個 View 共享，那它可能就不需要 MVVM。**

換句話說：
- **一個 View + 一個 ViewModel**：可以用，但如果頁面夠簡單，直接寫在 View 裡也可以
- **多個 View 共享同一個 ViewModel**：MVVM 是幾乎唯一合理的架構選擇
- **複雜的跨頁面流程**：Clean Architecture 分層 + MVVM 處理各頁面 Presentation

我的個人習慣是：小型專案先寫簡單的 View-based 結構，等專案複雜度確認了再重構成 MVVM。這比一開始過度設計再簡化更省力。

---

## 12. 入門指南

### Step 1：確認你的框架支援

| 框架 | MVVM 天然程度 | 推薦工具 |
|------|------------|---------|
| SwiftUI | 天然 MVVM | 內建 @Published/@StateObject |
| Flutter | 需要手動搭建 | Provider、Riverpod |
| WPF | 經典 MVVM | CommunityToolkit.Mvvm |
| Blazor | 支援 MVVM | 社區方案 |
| Android Compose | 需要手動搭建 | Hilt + ViewModel |

### Step 2：從一個簡單頁面開始

以 Flutter 為例，建立第一個 MVVM 頁面：

```dart
// Step 1：定義 Model
class TodoItem {
    String title;
    bool done;
    TodoItem({required this.title, this.done = false});
}

// Step 2：建立 ViewModel
class TodoViewModel extends ChangeNotifier {
    List<TodoItem> _items = [];
    List<TodoItem> get items => _items;
    
    void add(String title) {
        _items.add(TodoItem(title: title));
        notifyListeners();
    }
    
    void toggle(int index) {
        _items[index].done = !_items[index].done;
        notifyListeners();
    }
}

// Step 3：在 View 中使用
class TodoPage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return ChangeNotifierProvider(
            create: (_) => TodoViewModel(),
            child: Consumer<TodoViewModel>(
                builder: (context, vm, _) {
                    return ListView(
                        children: vm.items.map((item) =>
                            CheckboxListTile(
                                title: Text(item.title),
                                value: item.done,
                                onChanged: (_) => vm.toggle(vm.items.indexOf(item)),
                            )
                        ).toList(),
                    );
                },
            ),
        );
    }
}
```

### Step 3：建立第一個 Repository（可選）

當你需要從網路載入資料時，加入 Repository 層：

```dart
class TodoRepository {
    Future<List<TodoItem>> fetchTodos() async {
        final response = await http.get('api/todos');
        return parseTodos(response);
    }
}

class TodoViewModel extends ChangeNotifier {
    final TodoRepository _repository;
    
    TodoViewModel(this._repository);
    
    Future<void> load() async {
        _items = await _repository.fetchTodos();
        notifyListeners();
    }
}
```

### Step 4：加入單元測試

```dart
test('add adds item to list', () {
    final vm = TodoViewModel();
    vm.add('Test Todo');
    expect(vm.items.length, 1);
    expect(vm.items[0].title, 'Test Todo');
});
```

---

**相關資源：**

- [Microsoft Learn：.NET MVVM](https://learn.microsoft.com/en-us/dotnet/architecture/maui/mvvm)
- [Flutter 官方架構指南](https://docs.flutter.dev/app-architecture/guide)
- [GitHub：CommunityToolkit.Mvvm](https://github.com/CommunityToolkit/dotnet)
- [SwiftUI 官方文件](https://developer.apple.com/documentation/swiftui)
