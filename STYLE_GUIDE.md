# PCF Cases 风格指南

## 🎨 设计原则

### 视觉一致性
- **颜色系统**: 始终使用 `--hi: #4D6BFE` 作为主色调
- **字体层级**: display-hero, display-num, kicker, eyebrow 保持一致
- **圆角标准**: 18px (line-box), 28px (hero区域), 999px (按钮)
- **间距系统**: 8px 基础单位，section 间距 h-8 lg:h-10

### 页面结构框架
所有案例页面必须包含这些标准部分，但内容可以完全自定义：

## 📐 必需的页面结构

### 1. Navigation Bar
```html
<!-- 统一导航 - 所有页面一致 -->
<nav class="nav-sticky">
  <div class="wrap px-6 lg:px-12 xl:px-16 py-4">
    <!-- 标准导航内容 -->
  </div>
</nav>
```

### 2. Breadcrumb
```html
<!-- 面包屑 - 统一格式 -->
<div class="breadcrumb mb-6">
  <a href="../index.html">PCF Cases</a> / <span>案例名称</span>
</div>
```

### 3. Hero Section (必需，但内容灵活)
```html
<!-- 英雄区域 - 使用统一的类名和结构 -->
<section class="grid-12 items-end gap-6 hi-field rounded-[28px] p-8 lg:p-12 solid-box reveal mb-10">
  <div class="col-span-12 lg:col-span-7">
    <div class="kicker">Case Study #XXX</div>
    <h1 class="display-hero mt-3">
      [公司名称]<br class="hidden md:block"/>
      <span class="text-xl font-semibold align-middle">[核心洞察]</span>
    </h1>
    <p class="mt-5 max-w-3xl text-lg leading-relaxed">
      [案例描述 - 可以完全自定义]
    </p>
    <!-- 标准导航按钮 -->
    <div class="mt-7 flex flex-wrap gap-3">
      <a class="btn" href="#compare"><i class="fa-solid fa-table-columns"></i> Comparison</a>
      <a class="btn" href="#playbook"><i class="fa-solid fa-timeline"></i> Playbook</a>
      <a class="btn" href="#kpi"><i class="fa-solid fa-chart-line"></i> KPIs</a>
    </div>
  </div>
  <div class="col-span-12 lg:col-span-5">
    <!-- 关键指标 - 数量和内容可以变化 -->
    <div class="grid gap-5">
      <div class="line-box p-6">
        <div class="eyebrow mb-2">[指标标签]</div>
        <div class="display-num outlined leading-none">[数值]</div>
        <div class="mt-2 text-sm">[说明]</div>
      </div>
    </div>
  </div>
</section>
```

### 4. 核心分析部分 (顺序固定，内容灵活)

#### A. Product Overview (可选)
- 统一的 `solid-box p-8 lg:p-12 reveal mb-10` 样式
- 左右分栏：问题 vs 解决方案
- 内容完全自定义

#### B. Comparison Section (必需)
- ID必须是 `#compare`
- 使用 `grid-12 reveal mb-10` 布局
- 左侧：失败的渠道，右侧：成功的渠道
- 每个渠道用 `line-box p-5` 展示

#### C. Playbook Section (必需) 
- ID必须是 `#playbook`
- 使用 `solid-box p-8 lg:p-12 reveal mb-10` 
- 可以是步骤列表、时间线、或其他结构
- 标题格式：`[数字]-Step [主题]`

#### D. KPI/Data Section (必需)
- ID必须是 `#kpi`
- 使用 `grid-12 reveal mb-10` 布局
- 可以包含图表、指标卡片、或其他数据可视化

#### E. Insights & Takeaways (必需)
- 两个独立的section，都使用 `solid-box` 样式
- Insights: 深度洞察分析
- Takeaways: 可执行的建议

### 5. Navigation & Footer (统一)
```html
<!-- 案例间导航 - 统一格式 -->
<section class="flex justify-between items-center">
  <a href="../index.html" class="btn">
    <i class="fa-solid fa-arrow-left"></i> All Cases
  </a>
  <div class="text-sm opacity-70">Case Study #XXX</div>
  <a href="[下一个案例].html" class="btn">
    Next: [案例名] <i class="fa-solid fa-arrow-right"></i>
  </a>
</section>
```

## 🎯 内容灵活性指南

### 可以自定义的元素：
- ✅ Hero区域的具体指标和数量
- ✅ Playbook的步骤数量和具体策略
- ✅ 数据可视化的类型（图表、卡片、流程图）
- ✅ 特殊的组件（如Calendly的时间线）
- ✅ 案例特有的insights和分析角度
- ✅ 配色的深浅变化（但主色调保持一致）

### 必须保持一致的元素：
- ❌ 页面整体结构和section顺序
- ❌ CSS类名和响应式布局
- ❌ 导航和面包屑格式
- ❌ SEO meta标签结构
- ❌ 字体层级和间距系统

## 🚀 新案例创建流程

### 1. 复制现有案例作为起点
推荐复制SaveWise或Calendly的HTML文件

### 2. 更新必需元素
- Meta标签和SEO信息
- 面包屑和导航
- Hero区域基本信息

### 3. 自定义核心内容
- 根据案例特点设计unique insights
- 创建专属的数据可视化
- 编写深度的策略分析

### 4. 保持一致性检查
- 确保所有必需的锚点ID存在
- 验证CSS类名正确使用
- 测试响应式布局

## 📊 SEO一致性要求

### Meta标签模板：
```html
<title>[公司名] Case Study: [核心洞察] · Product–Channel Fit</title>
<meta name="description" content="How [公司] [关键策略描述] [具体结果数据].">
<meta name="keywords" content="[公司名], product-channel fit, [主要策略], [行业], case study">
```

### 结构化数据：
每个案例都必须包含Article schema，但内容可以自定义

## 🎨 组件库

### 标准组件1: 指标卡片
```html
<div class="line-box p-4">
  <div class="flex justify-between items-center">
    <span class="text-sm font-bold">[指标名称]</span>
    <span class="font-bold">[数值]</span>
  </div>
  <div class="text-xs opacity-70 mt-1">[说明]</div>
</div>
```

### 标准组件2: 洞察框
```html
<div class="bg-gray-50 p-3 rounded text-xs">
  <b>Key insight:</b> [具体洞察内容]
</div>
```

### 标准组件3: 结果框
```html
<!-- 成功结果 -->
<div class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
  <p class="text-sm"><b>Result:</b> [具体结果]</p>
</div>

<!-- 失败结果 -->
<div class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
  <p class="text-sm"><b>Result:</b> [失败原因]</p>
</div>
```

这样既保证了视觉一致性，又给每个案例足够的创作空间！
