import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
ignoreDeadLinks: true,
  title: "On Java8",
  description: "java 编程思想第5版，on java 8",
  themeConfig: {
	search: {
      provider: 'local'
	},
    logo:"/logo.jpg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
	  { text: '开始阅读', link: '/book/00-On-Java-8.md' },
      { text: '计算机底层', link: 'https://cpu.wonyes.org' },
	  { text: '原创画作', link: 'https://www.wonyes.org' },
    ],

    sidebar: [

{
	text:"On Java 8",
	link:"/book/00-On-Java-8.md",
	items:[
		{ text: '封面', link: '/book/00-On-Java-8.md' },
		{ text: '前言', link: '/book/00-Preface.md' },
		{ text: '简介', link: '/book/00-Introduction.md' },
	]
},
{text:"第一章 对象的概念",link:"/book/01-What-is-an-Object.md",items:[
  {text:"抽象",link:"/book/01-What-is-an-Object.md#抽象"},
  {text:"接口",link:"/book/01-What-is-an-Object.md#接口"},
  {text:"服务提供",link:"/book/01-What-is-an-Object.md#服务提供"},
  {text:"封装",link:"/book/01-What-is-an-Object.md#封装"},
  {text:"复用",link:"/book/01-What-is-an-Object.md#复用"},
  {text:"继承",link:"/book/01-What-is-an-Object.md#继承"},
  {text:"多态",link:"/book/01-What-is-an-Object.md#多态"},
  {text:"单继承",link:"/book/01-What-is-an-Object.md#单继承"},
  {text:"集合",link:"/book/01-What-is-an-Object.md#集合"},
  {text:"生命周期",link:"/book/01-What-is-an-Object.md#生命周期"},
  {text:"异常处理",link:"/book/01-What-is-an-Object.md#异常处理"},
  {text:"本章小结",link:"/book/01-What-is-an-Object.md#本章小结"}]},
{text:"第二章 安装Java和本书用例",link:"/book/02-Installing-Java-and-the-Book-Examples.md",items:[
  {text:"编辑器",link:"/book/02-Installing-Java-and-the-Book-Examples.md#编辑器"},
  {text:"Shell",link:"/book/02-Installing-Java-and-the-Book-Examples.md#Shell"},
  {text:"Java安装",link:"/book/02-Installing-Java-and-the-Book-Examples.md#Java安装"},
  {text:"校验安装",link:"/book/02-Installing-Java-and-the-Book-Examples.md#校验安装"},  {text:"安装和运行代码示例",link:"/book/02-Installing-Java-and-the-Book-Examples.md#安装和运行代码示例"}]},
{text:"第三章 万物皆对象",link:"/book/03-Objects-Everywhere.md",items:[
  {text:"对象操纵",link:"/book/03-Objects-Everywhere.md#对象操纵"},
  {text:"对象创建",link:"/book/03-Objects-Everywhere.md#对象创建"},
  {text:"代码注释",link:"/book/03-Objects-Everywhere.md#代码注释"},
  {text:"对象清理",link:"/book/03-Objects-Everywhere.md#对象清理"},
  {text:"类的创建",link:"/book/03-Objects-Everywhere.md#类的创建"},
  {text:"程序编写",link:"/book/03-Objects-Everywhere.md#程序编写"},
  {text:"小试牛刀",link:"/book/03-Objects-Everywhere.md#小试牛刀"},
  {text:"编码风格",link:"/book/03-Objects-Everywhere.md#编码风格"},
  {text:"本章小结",link:"/book/03-Objects-Everywhere.md#本章小结"}]},
{text:"第四章 运算符",link:"/book/04-Operators.md",items:[
  {text:"开始使用",link:"/book/04-Operators.md#开始使用"},
  {text:"优先级",link:"/book/04-Operators.md#优先级"},
  {text:"赋值",link:"/book/04-Operators.md#赋值"},
  {text:"算术运算符",link:"/book/04-Operators.md#算术运算符"},
  {text:"递增和递减",link:"/book/04-Operators.md#递增和递减"},
  {text:"关系运算符",link:"/book/04-Operators.md#关系运算符"},
  {text:"逻辑运算符",link:"/book/04-Operators.md#逻辑运算符"},
  {text:"字面值常量",link:"/book/04-Operators.md#字面值常量"},
  {text:"按位运算符",link:"/book/04-Operators.md#按位运算符"},
  {text:"移位运算符",link:"/book/04-Operators.md#移位运算符"},
  {text:"三元运算符",link:"/book/04-Operators.md#三元运算符"},
  {text:"字符串运算符",link:"/book/04-Operators.md#字符串运算符"},
  {text:"常见陷阱",link:"/book/04-Operators.md#常见陷阱"},
  {text:"类型转换",link:"/book/04-Operators.md#类型转换"},
  {text:"Java没有sizeof",link:"/book/04-Operators.md#Java没有sizeof"},
  {text:"运算符总结",link:"/book/04-Operators.md#运算符总结"},
  {text:"本章小结",link:"/book/04-Operators.md#本章小结"}]},
{text:"第五章 控制流",link:"/book/05-Control-Flow.md",items:[
  {text:"true和flase",link:"/book/05-Control-Flow.md#true和flase"},
  {text:"if-else",link:"/book/05-Control-Flow.md#if-else"},
  {text:"迭代语句",link:"/book/05-Control-Flow.md#迭代语句"},
  {text:"for-in语法",link:"/book/05-Control-Flow.md#for-in语法"},
  {text:"return",link:"/book/05-Control-Flow.md#return"},
  {text:"break和continue",link:"/book/05-Control-Flow.md#break和continue"},
  {text:"臭名昭著的goto",link:"/book/05-Control-Flow.md#臭名昭著的goto"},
  {text:"switch",link:"/book/05-Control-Flow.md#switch"},
  {text:"switch字符串",link:"/book/05-Control-Flow.md#switch字符串"},
  {text:"本章小结",link:"/book/05-Control-Flow.md#本章小结"}]},
{text:"第六章 初始化和清理",link:"/book/06-Housekeeping.md",items:[
  {text:"利用构造器保证初始化",link:"/book/06-Housekeeping.md#利用构造器保证初始化"},
  {text:"方法重载",link:"/book/06-Housekeeping.md#方法重载"},
  {text:"无参构造器",link:"/book/06-Housekeeping.md#无参构造器"},
  {text:"this关键字",link:"/book/06-Housekeeping.md#this关键字"},
  {text:"垃圾回收器",link:"/book/06-Housekeeping.md#垃圾回收器"},
  {text:"成员初始化",link:"/book/06-Housekeeping.md#成员初始化"},
  {text:"构造器初始化",link:"/book/06-Housekeeping.md#构造器初始化"},
  {text:"数组初始化",link:"/book/06-Housekeeping.md#数组初始化"},
  {text:"枚举类型",link:"/book/06-Housekeeping.md#枚举类型"},
  {text:"本章小结",link:"/book/06-Housekeeping.md#本章小结"}]},
{text:"第七章 封装",link:"/book/07-Implementation-Hiding.md",items:[
  {text:"包的概念",link:"/book/07-Implementation-Hiding.md#包的概念"},
  {text:"访问权限修饰符",link:"/book/07-Implementation-Hiding.md#访问权限修饰符"},
  {text:"接口和实现",link:"/book/07-Implementation-Hiding.md#接口和实现"},
  {text:"类访问权限",link:"/book/07-Implementation-Hiding.md#类访问权限"},
  {text:"本章小结",link:"/book/07-Implementation-Hiding.md#本章小结"}]},
{text:"第八章 复用",link:"/book/08-Reuse.md",items:[
  {text:"组合语法",link:"/book/08-Reuse.md#组合语法"},
  {text:"继承语法",link:"/book/08-Reuse.md#继承语法"},
  {text:"委托",link:"/book/08-Reuse.md#委托"},
  {text:"结合组合与继承",link:"/book/08-Reuse.md#结合组合与继承"},
  {text:"组合与继承的选择",link:"/book/08-Reuse.md#组合与继承的选择"},
  {text:"protected",link:"/book/08-Reuse.md#protected"},
  {text:"向上转型",link:"/book/08-Reuse.md#向上转型"},
  {text:"final关键字",link:"/book/08-Reuse.md#final关键字"},
  {text:"类初始化和加载",link:"/book/08-Reuse.md#类初始化和加载"},
  {text:"本章小结",link:"/book/08-Reuse.md#本章小结"}]},
{text:"第九章 多态",link:"/book/09-Polymorphism.md",items:[
  {text:"向上转型回溯",link:"/book/09-Polymorphism.md#向上转型回溯"},
  {text:"深入理解",link:"/book/09-Polymorphism.md#深入理解"},
  {text:"构造器和多态",link:"/book/09-Polymorphism.md#构造器和多态"},
  {text:"返回类型协变",link:"/book/09-Polymorphism.md#返回类型协变"},
  {text:"使用继承设计",link:"/book/09-Polymorphism.md#使用继承设计"},
  {text:"本章小结",link:"/book/09-Polymorphism.md#本章小结"}]},
{text:"第十章 接口",link:"/book/10-Interfaces.md",items:[
  {text:"抽象类和方法",link:"/book/10-Interfaces.md#抽象类和方法"},
  {text:"接口创建",link:"/book/10-Interfaces.md#接口创建"},
  {text:"抽象类和接口",link:"/book/10-Interfaces.md#抽象类和接口"},
  {text:"完全解耦",link:"/book/10-Interfaces.md#完全解耦"},
  {text:"多接口结合",link:"/book/10-Interfaces.md#多接口结合"},
  {text:"使用继承扩展接口",link:"/book/10-Interfaces.md#使用继承扩展接口"},
  {text:"接口适配",link:"/book/10-Interfaces.md#接口适配"},
  {text:"接口字段",link:"/book/10-Interfaces.md#接口字段"},
  {text:"接口嵌套",link:"/book/10-Interfaces.md#接口嵌套"},
  {text:"接口和工厂方法模式",link:"/book/10-Interfaces.md#接口和工厂方法模式"},
  {text:"本章小结",link:"/book/10-Interfaces.md#本章小结"}]},
{text:"第十一章 内部类",link:"/book/11-Inner-Classes.md",items:[
  {text:"创建内部类",link:"/book/11-Inner-Classes.md#创建内部类"},
  {text:"链接外部类",link:"/book/11-Inner-Classes.md#链接外部类"},
  {text:"内部类this和new的使用",link:"/book/11-Inner-Classes.md#内部类this和new的使用"},
  {text:"内部类向上转型",link:"/book/11-Inner-Classes.md#内部类向上转型"},
  {text:"内部类方法和作用域",link:"/book/11-Inner-Classes.md#内部类方法和作用域"},
  {text:"匿名内部类",link:"/book/11-Inner-Classes.md#匿名内部类"},
  {text:"嵌套类",link:"/book/11-Inner-Classes.md#嵌套类"},
  {text:"为什么需要内部类",link:"/book/11-Inner-Classes.md#为什么需要内部类"},
  {text:"继承内部类",link:"/book/11-Inner-Classes.md#继承内部类"},
  {text:"重写内部类",link:"/book/11-Inner-Classes.md#重写内部类"},
  {text:"内部类局部变量",link:"/book/11-Inner-Classes.md#内部类局部变量"},
  {text:"内部类标识符",link:"/book/11-Inner-Classes.md#内部类标识符"},
  {text:"本章小结",link:"/book/11-Inner-Classes.md#本章小结"}]},
{text:"第十二章 集合",link:"/book/12-Collections.md",items:[
  {text:"泛型和类型安全的集合",link:"/book/12-Collections.md#泛型和类型安全的集合"},
  {text:"基本概念",link:"/book/12-Collections.md#基本概念"},
  {text:"添加元素组",link:"/book/12-Collections.md#添加元素组"},
  {text:"集合的打印",link:"/book/12-Collections.md#集合的打印"},
  {text:"列表List",link:"/book/12-Collections.md#列表List"},
  {text:"迭代器Iterators",link:"/book/12-Collections.md#迭代器Iterators"},
  {text:"链表LinkedList",link:"/book/12-Collections.md#链表LinkedList"},
  {text:"堆栈Stack",link:"/book/12-Collections.md#堆栈Stack"},
  {text:"集合Set",link:"/book/12-Collections.md#集合Set"},
  {text:"映射Map",link:"/book/12-Collections.md#映射Map"},
  {text:"队列Queue",link:"/book/12-Collections.md#队列Queue"},
  {text:"集合与迭代器",link:"/book/12-Collections.md#集合与迭代器"},
  {text:"for-in和迭代器",link:"/book/12-Collections.md#for-in和迭代器"},
  {text:"本章小结",link:"/book/12-Collections.md#本章小结"}]},
{text:"第十三章 函数式编程",link:"/book/13-Functional-Programming.md",items:[
  {text:"新旧对比",link:"/book/13-Functional-Programming.md#新旧对比"},
  {text:"Lambda表达式",link:"/book/13-Functional-Programming.md#Lambda表达式"},
  {text:"方法引用",link:"/book/13-Functional-Programming.md#方法引用"},
  {text:"函数式接口",link:"/book/13-Functional-Programming.md#函数式接口"},
  {text:"高阶函数",link:"/book/13-Functional-Programming.md#高阶函数"},
  {text:"闭包",link:"/book/13-Functional-Programming.md#闭包"},
  {text:"函数组合",link:"/book/13-Functional-Programming.md#函数组合"},
  {text:"柯里化和部分求值",link:"/book/13-Functional-Programming.md#柯里化和部分求值"},
  {text:"纯函数式编程",link:"/book/13-Functional-Programming.md#纯函数式编程"},
  {text:"本章小结",link:"/book/13-Functional-Programming.md#本章小结"}]},
{text:"第十四章 流式编程",link:"/book/14-Streams.md",items:[
  {text:"流支持",link:"/book/14-Streams.md#流支持"},
  {text:"流创建",link:"/book/14-Streams.md#流创建"},
  {text:"中级流操作",link:"/book/14-Streams.md#中级流操作"},
  {text:"Optional类",link:"/book/14-Streams.md#Optional类"},
  {text:"终端操作",link:"/book/14-Streams.md#终端操作"},
  {text:"本章小结",link:"/book/14-Streams.md#本章小结"}]},
{text:"第十五章 异常",link:"/book/15-Exceptions.md",items:[
  {text:"异常概念",link:"/book/15-Exceptions.md#异常概念"},
  {text:"基本异常",link:"/book/15-Exceptions.md#基本异常"},
  {text:"异常捕获",link:"/book/15-Exceptions.md#异常捕获"},
  {text:"自定义异常",link:"/book/15-Exceptions.md#自定义异常"},
  {text:"异常规范",link:"/book/15-Exceptions.md#异常规范"},
  {text:"任意异常捕获",link:"/book/15-Exceptions.md#任意异常捕获"},
  {text:"Java标准异常",link:"/book/15-Exceptions.md#Java标准异常"},
  {text:"finally关键字",link:"/book/15-Exceptions.md#finally关键字"},
  {text:"异常限制",link:"/book/15-Exceptions.md#异常限制"},
  {text:"异常构造",link:"/book/15-Exceptions.md#异常构造"},
  {text:"Try-With-Resources用法",link:"/book/15-Exceptions.md#Try-With-Resources用法"},
  {text:"异常匹配",link:"/book/15-Exceptions.md#异常匹配"},
  {text:"异常准则",link:"/book/15-Exceptions.md#异常准则"},
  {text:"异常指南",link:"/book/15-Exceptions.md#异常指南"},
  {text:"本章小结",link:"/book/15-Exceptions.md#本章小结"}]},
{text:"第十六章 代码校验",link:"/book/16-Validating-Your-Code.md",items:[
  {text:"测试",link:"/book/16-Validating-Your-Code.md#测试"},
  {text:"前提条件",link:"/book/16-Validating-Your-Code.md#前提条件"},
  {text:"测试驱动开发",link:"/book/16-Validating-Your-Code.md#测试驱动开发"},
  {text:"日志",link:"/book/16-Validating-Your-Code.md#日志"},
  {text:"调试",link:"/book/16-Validating-Your-Code.md#调试"},
  {text:"基准测试",link:"/book/16-Validating-Your-Code.md#基准测试"},
  {text:"分析和优化",link:"/book/16-Validating-Your-Code.md#分析和优化"},
  {text:"风格检测",link:"/book/16-Validating-Your-Code.md#风格检测"},
  {text:"静态错误分析",link:"/book/16-Validating-Your-Code.md#静态错误分析"},
  {text:"代码重审",link:"/book/16-Validating-Your-Code.md#代码重审"},
  {text:"结对编程",link:"/book/16-Validating-Your-Code.md#结对编程"},
  {text:"重构",link:"/book/16-Validating-Your-Code.md#重构"},
  {text:"持续集成",link:"/book/16-Validating-Your-Code.md#持续集成"},
  {text:"本章小结",link:"/book/16-Validating-Your-Code.md#本章小结"}]},
{text:"第十七章 文件",link:"/book/17-Files.md",items:[
  {text:"文件和目录路径",link:"/book/17-Files.md#文件和目录路径"},
  {text:"目录",link:"/book/17-Files.md#目录"},
  {text:"文件系统",link:"/book/17-Files.md#文件系统"},
  {text:"路径监听",link:"/book/17-Files.md#路径监听"},
  {text:"文件查找",link:"/book/17-Files.md#文件查找"},
  {text:"文件读写",link:"/book/17-Files.md#文件读写"},
  {text:"本章小结",link:"/book/17-Files.md#本章小结"}]},
{text:"第十八章 字符串",link:"/book/18-Strings.md",items:[
  {text:"字符串的不可变",link:"/book/18-Strings.md#字符串的不可变"},
  {text:"重载和StringBuilder",link:"/book/18-Strings.md#重载和StringBuilder"},
  {text:"意外递归",link:"/book/18-Strings.md#意外递归"},
  {text:"字符串操作",link:"/book/18-Strings.md#字符串操作"},
  {text:"格式化输出",link:"/book/18-Strings.md#格式化输出"},
  {text:"常规表达式",link:"/book/18-Strings.md#常规表达式"},
  {text:"扫描输入",link:"/book/18-Strings.md#扫描输入"},
  {text:"StringTokenizer类",link:"/book/18-Strings.md#StringTokenizer类"},
  {text:"本章小结",link:"/book/18-Strings.md#本章小结"}]},
{text:"第十九章 类型信息",link:"/book/19-Type-Information.md",items:[
  {text:"运行时类型信息",link:"/book/19-Type-Information.md#运行时类型信息"},
  {text:"类的对象",link:"/book/19-Type-Information.md#类的对象"},
  {text:"类型转换检测",link:"/book/19-Type-Information.md#类型转换检测"},
  {text:"注册工厂",link:"/book/19-Type-Information.md#注册工厂"},
  {text:"类的等价比较",link:"/book/19-Type-Information.md#类的等价比较"},
  {text:"反射运行时类信息",link:"/book/19-Type-Information.md#反射运行时类信息"},
  {text:"动态代理",link:"/book/19-Type-Information.md#动态代理"},
  {text:"Optional类",link:"/book/19-Type-Information.md#Optional类"},
  {text:"接口和类型",link:"/book/19-Type-Information.md#接口和类型"},
  {text:"本章小结",link:"/book/19-Type-Information.md#本章小结"}]},
{text:"第二十章 泛型",link:"/book/20-Generics.md",items:[
  {text:"简单泛型",link:"/book/20-Generics.md#简单泛型"},
  {text:"泛型接口",link:"/book/20-Generics.md#泛型接口"},
  {text:"泛型方法",link:"/book/20-Generics.md#泛型方法"},
  {text:"复杂模型构建",link:"/book/20-Generics.md#复杂模型构建"},
  {text:"泛型擦除",link:"/book/20-Generics.md#泛型擦除"},
  {text:"补偿擦除",link:"/book/20-Generics.md#补偿擦除"},
  {text:"边界",link:"/book/20-Generics.md#边界"},
  {text:"通配符",link:"/book/20-Generics.md#通配符"},
  {text:"问题",link:"/book/20-Generics.md#问题"},
  {text:"自我约束类型",link:"/book/20-Generics.md#自我约束类型"},
  {text:"动态类型安全",link:"/book/20-Generics.md#动态类型安全"},
  {text:"泛型异常",link:"/book/20-Generics.md#泛型异常"},
  {text:"混入",link:"/book/20-Generics.md#混入"},
  {text:"潜在类型",link:"/book/20-Generics.md#潜在类型"},
  {text:"补偿不足",link:"/book/20-Generics.md#补偿不足"},
  {text:"辅助潜在类型",link:"/book/20-Generics.md#辅助潜在类型"},
  {text:"泛型的优劣",link:"/book/20-Generics.md#泛型的优劣"}]},
{text:"第二十一章 数组",link:"/book/21-Arrays.md",items:[
  {text:"数组特性",link:"/book/21-Arrays.md#数组特性"},
  {text:"一等对象",link:"/book/21-Arrays.md#一等对象"},
  {text:"返回数组",link:"/book/21-Arrays.md#返回数组"},
  {text:"多维数组",link:"/book/21-Arrays.md#多维数组"},
  {text:"泛型数组",link:"/book/21-Arrays.md#泛型数组"},
  {text:"Arrays的fill方法",link:"/book/21-Arrays.md#Arrays的fill方法"},
  {text:"Arrays的setAll方法",link:"/book/21-Arrays.md#Arrays的setAll方法"},
  {text:"增量生成",link:"/book/21-Arrays.md#增量生成"},
  {text:"随机生成",link:"/book/21-Arrays.md#随机生成"},
  {text:"泛型和基本数组",link:"/book/21-Arrays.md#泛型和基本数组"},
  {text:"数组元素修改",link:"/book/21-Arrays.md#数组元素修改"},
  {text:"数组并行",link:"/book/21-Arrays.md#数组并行"},
  {text:"Arrays工具类",link:"/book/21-Arrays.md#Arrays工具类"},
  {text:"数组拷贝",link:"/book/21-Arrays.md#数组拷贝"},
  {text:"数组比较",link:"/book/21-Arrays.md#数组比较"},
  {text:"流和数组",link:"/book/21-Arrays.md#流和数组"},
  {text:"数组排序",link:"/book/21-Arrays.md#数组排序"},
  {text:"binarySearch二分查找",link:"/book/21-Arrays.md#binarySearch二分查找"},
  {text:"parallelPrefix并行前缀",link:"/book/21-Arrays.md#parallelPrefix并行前缀"},
  {text:"本章小结",link:"/book/21-Arrays.md#本章小结"}]},
{text:"第二十二章 枚举",link:"/book/22-Enumerations.md",items:[
  {text:"基本功能",link:"/book/22-Enumerations.md#基本功能"},
  {text:"方法添加",link:"/book/22-Enumerations.md#方法添加"},
  {text:"switch语句",link:"/book/22-Enumerations.md#switch语句"},
  {text:"values方法",link:"/book/22-Enumerations.md#values方法"},
  {text:"实现而非继承",link:"/book/22-Enumerations.md#实现而非继承"},
  {text:"随机选择",link:"/book/22-Enumerations.md#随机选择"},
  {text:"使用接口组织",link:"/book/22-Enumerations.md#使用接口组织"},
  {text:"使用EnumSet替代Flags",link:"/book/22-Enumerations.md#使用EnumSet替代Flags"},
  {text:"使用EnumMap",link:"/book/22-Enumerations.md#使用EnumMap"},
  {text:"常量特定方法",link:"/book/22-Enumerations.md#常量特定方法"},
  {text:"多次调度",link:"/book/22-Enumerations.md#多次调度"},
  {text:"本章小结",link:"/book/22-Enumerations.md#本章小结"}]},
{text:"第二十三章 注解",link:"/book/23-Annotations.md",items:[
  {text:"基本语法",link:"/book/23-Annotations.md#基本语法"},
  {text:"编写注解处理器",link:"/book/23-Annotations.md#编写注解处理器"},
  {text:"使用javac处理注解",link:"/book/23-Annotations.md#使用javac处理注解"},
  {text:"基于注解的单元测试",link:"/book/23-Annotations.md#基于注解的单元测试"},
  {text:"本章小结",link:"/book/23-Annotations.md#本章小结"}]},
{text:"第二十四章 并发编程",link:"/book/24-Concurrent-Programming.md",items:[
  {text:"术语问题",link:"/book/24-Concurrent-Programming.md#术语问题"},
  {text:"并发的超能力",link:"/book/24-Concurrent-Programming.md#并发的超能力"},
  {text:"针对速度",link:"/book/24-Concurrent-Programming.md#针对速度"},
  {text:"四句格言",link:"/book/24-Concurrent-Programming.md#四句格言"},
  {text:"残酷的真相",link:"/book/24-Concurrent-Programming.md#残酷的真相"},
  {text:"本章其余部分",link:"/book/24-Concurrent-Programming.md#本章其余部分"},
  {text:"并行流",link:"/book/24-Concurrent-Programming.md#并行流"},
  {text:"创建和运行任务",link:"/book/24-Concurrent-Programming.md#创建和运行任务"},
  {text:"终止耗时任务",link:"/book/24-Concurrent-Programming.md#终止耗时任务"},
  {text:"CompletableFuture类",link:"/book/24-Concurrent-Programming.md#CompletableFuture类"},
  {text:"死锁",link:"/book/24-Concurrent-Programming.md#死锁"},
  {text:"构造函数非线程安全",link:"/book/24-Concurrent-Programming.md#构造函数非线程安全"},
  {text:"复杂性和代价",link:"/book/24-Concurrent-Programming.md#复杂性和代价"},
  {text:"本章小结",link:"/book/24-Concurrent-Programming.md#本章小结"}]},
{text:"第二十五章 设计模式",link:"/book/25-Patterns.md",items:[
  {text:"概念",link:"/book/25-Patterns.md#概念"},
  {text:"构建型",link:"/book/25-Patterns.md#构建型"},
  {text:"面向实施",link:"/book/25-Patterns.md#面向实施"},
  {text:"工厂模式",link:"/book/25-Patterns.md#工厂模式"},
  {text:"函数对象",link:"/book/25-Patterns.md#函数对象"},
  {text:"接口改变",link:"/book/25-Patterns.md#接口改变"},
  {text:"解释器",link:"/book/25-Patterns.md#解释器"},
  {text:"回调",link:"/book/25-Patterns.md#回调"},
  {text:"多次调度",link:"/book/25-Patterns.md#多次调度"},
  {text:"模式重构",link:"/book/25-Patterns.md#模式重构"},
  {text:"抽象用法",link:"/book/25-Patterns.md#抽象用法"},
  {text:"多次派遣",link:"/book/25-Patterns.md#多次派遣"},
  {text:"访问者模式",link:"/book/25-Patterns.md#访问者模式"},
  {text:"RTTI的优劣",link:"/book/25-Patterns.md#RTTI的优劣"},
  {text:"本章小结",link:"/book/25-Patterns.md#本章小结"}]},

{text:"附录:补充",link:"/book/Appendix-Supplements.md",items:[
  {text:"可下载的补充",link:"/book/Appendix-Supplements.md#可下载的补充"},
  {text:"通过Thinking-in-C来巩固Java基础",link:"/book/Appendix-Supplements.md#通过Thinking-in-C来巩固Java基础"},
  {text:"动手实践",link:"/book/Appendix-Supplements.md#动手实践"}]},
{text:"附录:编程指南",link:"/book/Appendix-Programming-Guidelines.md",items:[
  {text:"设计",link:"/book/Appendix-Programming-Guidelines.md#设计"},
  {text:"实现",link:"/book/Appendix-Programming-Guidelines.md#实现"},
{text:"附录:文档注释",link:"/book/Appendix-Javadoc.md"}]},
{text:"附录:对象传递和返回",link:"/book/Appendix-Passing-and-Returning-Objects.md",items:[
  {text:"传递引用",link:"/book/Appendix-Passing-and-Returning-Objects.md#传递引用"},
  {text:"本地拷贝",link:"/book/Appendix-Passing-and-Returning-Objects.md#本地拷贝"},
  {text:"控制克隆",link:"/book/Appendix-Passing-and-Returning-Objects.md#控制克隆"},
  {text:"不可变类",link:"/book/Appendix-Passing-and-Returning-Objects.md#不可变类"},
  {text:"本章小结",link:"/book/Appendix-Passing-and-Returning-Objects.md#本章小结"}]},
{text:"附录:流式IO",link:"/book/Appendix-IO-Streams.md",items:[
  {text:"输入流类型",link:"/book/Appendix-IO-Streams.md#输入流类型"},
  {text:"输出流类型",link:"/book/Appendix-IO-Streams.md#输出流类型"},
  {text:"添加属性和有用的接口",link:"/book/Appendix-IO-Streams.md#添加属性和有用的接口"},
  {text:"Reader和Writer",link:"/book/Appendix-IO-Streams.md#Reader和Writer"},
  {text:"RandomAccessFile类",link:"/book/Appendix-IO-Streams.md#RandomAccessFile类"},
  {text:"IO流典型用途",link:"/book/Appendix-IO-Streams.md#IO流典型用途"},
  {text:"本章小结",link:"/book/Appendix-IO-Streams.md#本章小结"}]},
{text:"附录:标准IO",link:"/book/Appendix-Standard-IO.md",items:[
  {text:"执行控制",link:"/book/Appendix-Standard-IO.md#执行控制"}]},
{text:"附录:新IO",link:"/book/Appendix-New-IO.md",items:[
  {text:"ByteBuffer",link:"/book/Appendix-New-IO.md#ByteBuffer"},
  {text:"转换数据",link:"/book/Appendix-New-IO.md#数据转换"},
  {text:"获取原始类型",link:"/book/Appendix-New-IO.md#基本类型获取"},
  {text:"视图缓冲区",link:"/book/Appendix-New-IO.md#视图缓冲区"},
  {text:"使用缓冲区进行数据操作",link:"/book/Appendix-New-IO.md#缓冲区数据操作"},
  {text:"内存映射文件",link:"/book/Appendix-New-IO.md#内存映射文件"},
  {text:"文件锁定",link:"/book/Appendix-New-IO.md#文件锁定"}]},
{text:"附录:理解equals和hashCode方法",link:"/book/Appendix-Understanding-equals-and-hashCode.md",items:[
  {text:"equals典范",link:"/book/Appendix-Understanding-equals-and-hashCode.md#equals典范"},
  {text:"哈希和哈希码",link:"/book/Appendix-Understanding-equals-and-hashCode.md#哈希和哈希码"},
  {text:"调整HashMap",link:"/book/Appendix-Understanding-equals-and-hashCode.md#调整HashMap"}]},
{text:"附录:集合主题",link:"/book/Appendix-Collection-Topics.md",items:[
  {text:"示例数据",link:"/book/Appendix-Collection-Topics.md#示例数据"},
  {text:"List表现",link:"/book/Appendix-Collection-Topics.md#List表现"},
  {text:"Set表现",link:"/book/Appendix-Collection-Topics.md#Set表现"},
  {text:"在Map中使用函数式操作",link:"/book/Appendix-Collection-Topics.md#在Map中使用函数式操作"},
  {text:"选择Map的部分",link:"/book/Appendix-Collection-Topics.md#选择Map的部分"},
  {text:"集合的fill方法",link:"/book/Appendix-Collection-Topics.md#集合的fill方法"},
  {text:"使用Flyweight自定义集合和Map",link:"/book/Appendix-Collection-Topics.md#使用Flyweight自定义集合和Map"},
  {text:"集合功能",link:"/book/Appendix-Collection-Topics.md#集合功能"},
  {text:"可选操作",link:"/book/Appendix-Collection-Topics.md#可选操作"},
  {text:"Set和存储顺序",link:"/book/Appendix-Collection-Topics.md#Set和存储顺序"},
  {text:"队列",link:"/book/Appendix-Collection-Topics.md#队列"},
  {text:"理解Map",link:"/book/Appendix-Collection-Topics.md#理解Map"},
  {text:"集合工具类",link:"/book/Appendix-Collection-Topics.md#集合工具类"},
  {text:"持有引用",link:"/book/Appendix-Collection-Topics.md#持有引用"},
  {text:"避免旧式类库",link:"/book/Appendix-Collection-Topics.md#避免旧式类库"},
  {text:"本章小结",link:"/book/Appendix-Collection-Topics.md#本章小结"}]},
{text:"附录:并发底层原理",link:"/book/Appendix-Low-Level-Concurrency.md",items:[
  {text:"线程",link:"/book/Appendix-Low-Level-Concurrency.md#线程"},
  {text:"异常捕获",link:"/book/Appendix-Low-Level-Concurrency.md#异常捕获"},
  {text:"资源共享",link:"/book/Appendix-Low-Level-Concurrency.md#资源共享"},
  {text:"volatile关键字",link:"/book/Appendix-Low-Level-Concurrency.md#volatile关键字"},
  {text:"原子性",link:"/book/Appendix-Low-Level-Concurrency.md#原子性"},
  {text:"关键部分",link:"/book/Appendix-Low-Level-Concurrency.md#关键部分"},
  {text:"库组件",link:"/book/Appendix-Low-Level-Concurrency.md#库组件"},
  {text:"本章小结",link:"/book/Appendix-Low-Level-Concurrency.md#本章小结"}]},
{text:"附录:数据压缩",link:"/book/Appendix-Data-Compression.md",items:[
  {text:"使用Gzip简单压缩",link:"/book/Appendix-Data-Compression.md#使用Gzip简单压缩"},
  {text:"使用zip多文件存储",link:"/book/Appendix-Data-Compression.md#使用zip多文件存储"},
  {text:"Java的jar",link:"/book/Appendix-Data-Compression.md#Java的jar"}]},
{text:"附录:对象序列化",link:"/book/Appendix-Object-Serialization.md",items:[
  {text:"查找类",link:"/book/Appendix-Object-Serialization.md#查找类"},
  {text:"控制序列化",link:"/book/Appendix-Object-Serialization.md#控制序列化"},
  {text:"使用持久化",link:"/book/Appendix-Object-Serialization.md#使用持久化"}]},
{text:"附录:静态语言类型检查",link:"/book/Appendix-Benefits-and-Costs-of-Static-Type-Checking.md",items:[
  {text:"前言",link:"/book/Appendix-Benefits-and-Costs-of-Static-Type-Checking.md#前言"},
  {text:"静态类型检查和测试",link:"/book/Appendix-Benefits-and-Costs-of-Static-Type-Checking.md#静态类型检查和测试"},
  {text:"如何提升打字",link:"/book/Appendix-Benefits-and-Costs-of-Static-Type-Checking.md#如何提升打字"},
  {text:"生产力的成本",link:"/book/Appendix-Benefits-and-Costs-of-Static-Type-Checking.md#生产力的成本"},
  {text:"静态和动态",link:"/book/Appendix-Benefits-and-Costs-of-Static-Type-Checking.md#静态和动态"}]},
  
{text:"附录:C++和Java的优良传统",link:"/book/Appendix-The-Positive-Legacy-of-C-plus-plus-and-Java.md",items:[]},

{text:"附录:成为一名程序员",link:"/book/Appendix-Becoming-a-Programmer.md",items:[
  {text:"如何开始",link:"/book/Appendix-Becoming-a-Programmer.md#如何开始"},
  {text:"码农生涯",link:"/book/Appendix-Becoming-a-Programmer.md#码农生涯"},
  {text:"百分之五的神话",link:"/book/Appendix-Becoming-a-Programmer.md#百分之五的神话"},
  {text:"重在动手",link:"/book/Appendix-Becoming-a-Programmer.md#重在动手"},
  {text:"像打字般编程",link:"/book/Appendix-Becoming-a-Programmer.md#像打字般编程"},
  {text:"做你喜欢的事",link:"/book/Appendix-Becoming-a-Programmer.md#做你喜欢的事"}]},
{text:"词汇表",link:"/book/GLOSSARY.md",items:[]}

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jianchang512/onJava8' }
    ]
  }
})
