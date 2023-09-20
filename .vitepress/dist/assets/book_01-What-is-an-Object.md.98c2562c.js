import{_ as a,o as s,c as o,Q as p}from"./chunks/framework.c3fbb961.js";const e="/assets/reader.e1cbb83e.png",n="/assets/1545758268350.b3650087.png",l="/assets/1545763399825.ed2fb082.png",t="/assets/1545764724202.0610a233.png",c="/assets/1545764780795.7c0c66fa.png",r="/assets/1545764820176.751e73b0.png",i="/assets/1545839316314.5112e41e.png",d="/assets/1545841270997.e5e6b02c.png",S=JSON.parse('{"title":"第一章 对象的概念","description":"","frontmatter":{},"headers":[],"relativePath":"book/01-What-is-an-Object.md","filePath":"book/01-What-is-an-Object.md"}'),h={name:"book/01-What-is-an-Object.md"},g=p('<h1 id="第一章-对象的概念" tabindex="-1">第一章 对象的概念 <a class="header-anchor" href="#第一章-对象的概念" aria-label="Permalink to &quot;第一章 对象的概念&quot;">​</a></h1><blockquote><p>“我们没有意识到惯用语言的结构有多大的力量。可以毫不夸张地说，它通过语义反应机制奴役我们。语言表现出来并在无意识中给我们留下深刻印象的结构会自动投射到我们周围的世界。” -- Alfred Korzybski (1930)</p></blockquote><p>计算机革命的起源来自机器。编程语言就像是那台机器。它不仅是我们思维放大的工具与另一种表达媒介，更像是我们思想的一部分。语言的灵感来自其他形式的表达，如写作，绘画，雕塑，动画和电影制作。编程语言就是创建应用程序的思想结构。</p><p>面向对象编程（Object-Oriented Programming OOP）是一种编程思维方式和编码架构。本章讲述 OOP 的基本概述。如果读者对此不太理解，可先行跳过本章。等你具备一定编程基础后，请务必再回头看。只有这样你才能深刻理解面向对象编程的重要性及设计方式。</p><h2 id="抽象" tabindex="-1">抽象 <a class="header-anchor" href="#抽象" aria-label="Permalink to &quot;抽象&quot;">​</a></h2><p>所有编程语言都提供抽象机制。从某种程度上来说，问题的复杂度直接取决于抽象的类型和质量。这里的“类型”意思是：抽象的内容是什么？汇编语言是对底层机器的轻微抽象。接着出现的“命令式”语言（如 FORTRAN，BASIC 和 C）是对汇编语言的抽象。与汇编相比，这类语言已有了长足的改进，但它们的抽象原理依然要求我们着重考虑计算机的结构，而非问题本身的结构。</p><p>程序员必须要在机器模型（“解决方案空间”）和实际解决的问题模型（“问题空间”）之间建立起一种关联。这个过程既费精力，又脱离编程语言本身的范畴。这使得程序代码很难编写，维护代价高昂。同时还造就了一个副产业“编程方法”学科。</p><p>为机器建模的另一个方法是为要解决的问题制作模型。对一些早期语言来说，如 LISP 和 APL，它们的做法是“从不同的角度观察世界”——“所有问题都归纳为列表”或“所有问题都归纳为算法”。PROLOG 则将所有 问题都归纳为决策链。对于这些语言，我们认为它们一部分是“基于约束”的编程，另一部分则是专为 处理图形符号设计的（后者被证明限制性太强）。每种方法都有自己特殊的用途，适合解决某一类的问题。只要超出了它们力所能及的范围，就会显得非常笨拙。</p><p>面向对象的程序设计在此基础上跨出了一大步，程序员可利用一些工具表达“问题空间”内的元素。由于这种表达非常具有普遍性，所以不必受限于特定类型的问题。我们将问题空间中的元素以及它们在解决方案空间的表示称作“对象”（<strong>Object</strong>）。当然，还有一些在问题空间没有对应的对象体。通过添加新的对象类型，程序可进行灵活的调整，以便与特定的问题配合。所以当你在阅读描述解决方案的代码时，也是在阅读问题的表述。与我们以前见过的相比，这无疑是一种更加灵活、更加强大的语言抽象方法。总之，OOP 允许我们根据问题来描述问题，而不是根据运行解决方案的计算机。然而，它仍然与计算机有联系，每个对象都类似一台小计算机：它们有自己的状态并且可以进行特定的操作。这与现实世界的“对象”或者“物体”相似：它们都有自己的特征和行为。</p><p>Smalltalk 作为第一个成功的面向对象并影响了 Java 的程序设计语言 ，<em>Alan Kay</em> 总结了其五大基本特征。通过这些特征，我们可理解“纯粹”的面向对象程序设计方法是什么样的：</p><blockquote><ol><li><strong>万物皆对象</strong>。你可以将对象想象成一种特殊的变量。它存储数据，但可以在你对其“发出请求”时执行本身的操作。理论上讲，你总是可以从要解决的问题身上抽象出概念性的组件，然后在程序中将其表示为一个对象。</li><li><strong>程序是一组对象，通过消息传递来告知彼此该做什么</strong>。要请求调用一个对象的方法，你需要向该对象发送消息。</li><li><strong>每个对象都有自己的存储空间，可容纳其他对象</strong>。或者说，通过封装现有对象，可制作出新型对象。所以，尽管对象的概念非常简单，但在程序中却可达到任意高的复杂程度。</li><li><strong>每个对象都有一种类型</strong>。根据语法，每个对象都是某个“类”的一个“实例”。其中，“类”（Class）是“类型”（Type）的同义词。一个类最重要的特征就是“能将什么消息发给它？”。</li><li><strong>同一类所有对象都能接收相同的消息</strong>。这实际是别有含义的一种说法，大家不久便能理解。由于类型为“圆”（Circle）的一个对象也属于类型为“形状”（Shape）的一个对象，所以一个圆完全能接收发送给&quot;形状”的消息。这意味着可让程序代码统一指挥“形状”，令其自动控制所有符合“形状”描述的对象，其中自然包括“圆”。这一特性称为对象的“可替换性”，是OOP最重要的概念之一。</li></ol></blockquote><p><em>Grady Booch</em> 提供了对对象更简洁的描述：一个对象具有自己的状态，行为和标识。这意味着对象有自己的内部数据(提供状态)、方法 (产生行为)，并彼此区分（每个对象在内存中都有唯一的地址）。</p><h2 id="接口" tabindex="-1">接口 <a class="header-anchor" href="#接口" aria-label="Permalink to &quot;接口&quot;">​</a></h2><p>亚里士多德（<em>Aristotle</em>）大概是第一个认真研究“类型”的哲学家，他曾提出过“鱼类和鸟类”这样的概念。所有对象都是唯一的，但同时也是具有相同的特性和行为的对象所归属的类的一部分。这种思想被首次应用于第一个面向对象编程语言 Simula-67，它在程序中使用基本关键字 <strong>class</strong> 来引入新的类型（class 和 type 通常可互换使用，有些人对它们进行了进一步区分，他们强调 type 决定了接口，而 class 是那个接口的一种特殊实现方式）。</p><p>Simula 是一个很好的例子。正如这个名字所暗示的，它的作用是“模拟”（Simulate）类似“银行出纳员”这样的经典问题。在这个例子里，我们有一系列出纳员、客户、帐号、交易和货币单位等许多&quot;对象”。每类成员（元素）都具有一些通用的特征：每个帐号都有一定的余额；每名出纳都能接收客户的存款；等等。与此同时，每个成员都有自己的状态；每个帐号都有不同的余额；每名出纳都有一个名字。所以在计算机程序中，能用独一无二的实体分别表示出纳员、客户、帐号以及交易。这个实体便是“对象”，而且每个对象都隶属一个特定的“类”，那个类具有自己的通用特征与行为。</p><p>因此，在面向对象的程序设计中，尽管我们真正要做的是新建各种各样的数据“类型”（Type），但几乎所有面向对象的程序设计语言都采用了 <code>class</code> 关键字。当你看到 “type” 这个词的时候，请同时想到 <code>class</code>；反之亦然。</p><p>创建好一个类后，可根据情况生成许多对象。随后，可将那些对象作为要解决问题中存在的元素进行处理。事实上，当我们进行面向对象的程序设计时，面临的最大一项挑战是：如何在“问题空间”（问题实际存在的地方）的元素与“方案空间”（对实际问题进行建模的地方，如计算机）的元素之间建立理想的“一对一”的映射关系。</p><p>那么如何利用对象完成真正有用的工作呢？必须有一种办法能向对象发出请求，令其解决一些实际的问题，比如完成一次交易、在屏幕上画一些东西或者打开一个开关等等。每个对象仅能接受特定的请求。我们向对象发出的请求是通过它的“接口”（Interface）定义的，对象的“类型”或“类”则规定了它的接口形式。“类型”与“接口”的对应关系是面向对象程序设计的基础。</p><p>下面让我们以电灯泡为例：</p><p><img src="'+e+`" alt="reader"></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Light lt </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Light</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">lt.</span><span style="color:#B392F0;">on</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Light lt </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Light</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">lt.</span><span style="color:#6F42C1;">on</span><span style="color:#24292E;">();</span></span></code></pre></div><p>在这个例子中，类型／类的名称是 <strong>Light</strong>，可向 <strong>Light</strong> 对象发出的请求包括打开 <code>on</code>、关闭 <code>off</code>、变得更明亮 <code>brighten</code> 或者变得更暗淡 <code>dim</code>。通过声明一个引用，如 <code>lt</code> 和 <code>new</code> 关键字，我们创建了一个 <strong>Light</strong> 类型的对象，再用等号将其赋给引用。</p><p>为了向对象发送消息，我们使用句点符号 <code>.</code> 将 <code>lt</code> 和消息名称 <code>on</code> 连接起来。可以看出，使用一些预先定义好的类时，我们在程序里采用的代码是非常简单直观的。</p><p>上图遵循 <strong>UML</strong>（Unified Modeling Language，统一建模语言）的格式。每个类由一个框表示，框的顶部有类型名称，框中间部分是要描述的任何数据成员，方法（属于此对象的方法，它们接收任何发送到该对象的消息）在框的底部。通常，只有类的名称和公共方法在 <strong>UML</strong> 设计图中显示，因此中间部分未显示，如本例所示。如果你只对类名感兴趣，则也不需要显示方法信息。</p><h2 id="服务提供" tabindex="-1">服务提供 <a class="header-anchor" href="#服务提供" aria-label="Permalink to &quot;服务提供&quot;">​</a></h2><p>在开发或理解程序设计时，我们可以将对象看成是“服务提供者”。你的程序本身将为用户提供服务，并且它能通过调用其他对象提供的服务来实现这一点。我们的最终目标是开发或调用工具库中已有的一些对象，提供理想的服务来解决问题。</p><p>那么问题来了：我们该选择哪个对象来解决问题呢？例如，你正在开发一个记事本程序。<em>你可能会想到在屏幕输入默认的记事本对象</em>，一个用于检测不同类型打印机并执行打印的对象。这些对象中的某些已经有了。那对于还没有的对象，我们该设计成啥样呢？这些对象需要提供哪些服务，以及还需要调用其他哪些对象？</p><p>我们可以将这些问题一一分解，抽象成一组服务。软件设计的基本原则是高内聚：每个组件的内部作用明确，功能紧密相关。然而经常有人将太多功能塞进一个对象中。例如：在支票打印模块中，你需要设计一个可以同时读取文本格式又能正确识别不同打印机型号的对象。正确的做法是提供三个或更多对象：一个对象检查所有排版布局的目录；一个或一组可以识别不同打印机型号的对象展示通用的打印界面；第三个对象组合上述两个服务来完成任务。这样，每个对象都提供了一组紧密的服务。在良好的面向对象设计中，每个对象功能单一且高效。这样的程序设计可以提高我们代码的复用性，同时也方便别人阅读和理解我们的代码。只有让人知道你提供什么服务，别人才能更好地将其应用到其他模块或程序中。</p><h2 id="封装" tabindex="-1">封装 <a class="header-anchor" href="#封装" aria-label="Permalink to &quot;封装&quot;">​</a></h2><p>我们可以把编程的侧重领域划分为研发和应用。应用程序员调用研发程序员构建的基础工具类来做快速开发。研发程序员开发一个工具类，该工具类仅向应用程序员公开必要的内容，并隐藏内部实现的细节。这样可以有效地避免该工具类被错误的使用和更改，从而减少程序出错的可能。彼此职责划分清晰，相互协作。当应用程序员调用研发程序员开发的工具类时，双方建立了关系。应用程序员通过使用现成的工具类组装应用程序或者构建更大的工具库。如果工具类的创建者将类的内部所有信息都公开给调用者，那么有些使用规则就不容易被遵守。因为前者无法保证后者是否会按照正确的规则来使用，甚至是改变该工具类。只有设定访问控制，才能从根本上阻止这种情况的发生。</p><p>因此，使用访问控制的原因有以下两点：</p><ol><li><p>让应用程序员不要触摸他们不应该触摸的部分。（请注意，这也是一个哲学决策。部分编程语言认为如果程序员有需要，则应该让他们访问细节部分。）；</p></li><li><p>使类库的创建者（研发程序员）在不影响后者使用的情况下完善更新工具库。例如，我们开发了一个功能简单的工具类，后来发现可以通过优化代码来提高执行速度。假如工具类的接口和实现部分明确分开并受到保护，那我们就可以轻松地完成改造。</p></li></ol><p>Java 有三个显式关键字来设置类中的访问权限：<code>public</code>（公开），<code>private</code>(私有)和<code>protected</code>（受保护）。这些访问修饰符决定了谁能使用它们修饰的方法、变量或类。</p><ol><li><p><code>public</code>（公开）表示任何人都可以访问和使用该元素；</p></li><li><p><code>private</code>（私有）除了类本身和类内部的方法，外界无法直接访问该元素。<code>private</code> 是类和调用者之间的屏障。任何试图访问私有成员的行为都会报编译时错误；</p></li><li><p><code>protected</code>（受保护）类似于 <code>private</code>，区别是子类（下一节就会引入继承的概念）可以访问 <code>protected</code> 的成员，但不能访问 <code>private</code> 成员；</p></li><li><p><code>default</code>（默认）如果你不使用前面的三者，默认就是 <code>default</code> 访问权限。<code>default</code> 被称为包访问，因为该权限下的资源可以被同一包（库组件）中其他类的成员访问。</p></li></ol><h2 id="复用" tabindex="-1">复用 <a class="header-anchor" href="#复用" aria-label="Permalink to &quot;复用&quot;">​</a></h2><p>一个类经创建和测试后，理应是可复用的。然而很多时候，由于程序员没有足够的编程经验和远见，我们的代码复用性并不强。</p><p>代码和设计方案的复用性是面向对象程序设计的优点之一。我们可以通过重复使用某个类的对象来达到这种复用性。同时，我们也可以将一个类的对象作为另一个类的成员变量使用。新的类可以是由任意数量和任意类型的其他对象构成。这里涉及到“组合”和“聚合”的概念：</p><ul><li><p><strong>组合</strong>（Composition）经常用来表示“拥有”关系（has-a relationship）。例如，“汽车拥有引擎”。</p></li><li><p><strong>聚合</strong>（Aggregation）动态的<strong>组合</strong>。</p></li></ul><p><img src="`+n+'" alt="UML-example"></p><p>上图中实心三角形指向“ <strong>Car</strong> ”表示 <strong>组合</strong> 的关系；如果是 <strong>聚合</strong> 关系，可以使用空心三角形。</p><p>（<strong>译者注</strong>：组合和聚合都属于关联关系的一种，只是额外具有整体-部分的意义。至于是聚合还是组合，需要根据实际的业务需求来判断。可能相同超类和子类，在不同的业务场景，关联关系会发生变化。只看代码是无法区分聚合和组合的，具体是哪一种关系，只能从语义级别来区分。聚合关系中，整件不会拥有部件的生命周期，所以整件删除时，部件不会被删除。再者，多个整件可以共享同一个部件。组合关系中，整件拥有部件的生命周期，所以整件删除时，部件一定会跟着删除。而且，多个整件不可以同时共享同一个部件。这个区别可以用来区分某个关联关系到底是组合还是聚合。两个类生命周期不同步，则是聚合关系，生命周期同步就是组合关系。）</p><p>使用“组合”关系给我们的程序带来极大的灵活性。通常新建的类中，成员对象会使用 <code>private</code> 访问权限，这样应用程序员则无法对其直接访问。我们就可以在不影响客户代码的前提下，从容地修改那些成员。我们也可以在“运行时&quot;改变成员对象从而动态地改变程序的行为，这进一步增大了灵活性。下面一节要讲到的“继承”并不具备这种灵活性，因为编译器对通过继承创建的类进行了限制。</p><p>在面向对象编程中经常重点强调“继承”。在新手程序员的印象里，或许先入为主地认为“继承应当随处可见”。沿着这种思路产生的程序设计通常拙劣又复杂。相反，在创建新类时首先要考虑“组合”，因为它更简单灵活，而且设计更加清晰。等我们有一些编程经验后，一旦需要用到继承，就会明显意识到这一点。</p><h2 id="继承" tabindex="-1">继承 <a class="header-anchor" href="#继承" aria-label="Permalink to &quot;继承&quot;">​</a></h2><p>“继承”给面向对象编程带来极大的便利。它在概念上允许我们将各式各样的数据和功能封装到一起，这样便可恰当表达“问题空间”的概念，而不用受制于必须使用底层机器语言。</p><p>通过使用 <code>class</code> 关键字，这些概念形成了编程语言中的基本单元。遗憾的是，这么做还是有很多麻烦：在创建了一个类之后，即使另一个新类与其具有相似的功能，你还是得重新创建一个新类。但我们若能利用现成的数据类型，对其进行“克隆”，再根据情况进行添加和修改，情况就显得理想多了。“继承”正是针对这个目标而设计的。但继承并不完全等价于克隆。在继承过程中，若原始类（正式名称叫作基类、超类或父类）发生了变化，修改过的“克隆”类（正式名称叫作继承类或者子类）也会反映出这种变化。</p><p><img src="'+l+'" alt="Inheritance-example"></p><p>这个图中的箭头从派生类指向基类。正如你将看到的，通常有多个派生类。类型不仅仅描述一组对象的约束，它还涉及其他类型。两种类型可以具有共同的特征和行为，但是一种类型可能包含比另一种类型更多的特征，并且还可以处理更多的消息（或者以不同的方式处理它们）。继承通过基类和派生类的概念来表达这种相似性。基类包含派生自它的类型之间共享的所有特征和行为。创建基类以表示思想的核心。从基类中派生出其他类型来表示实现该核心的不同方式。</p><p><img src="'+t+'" alt="1545764724202"></p><p>例如，垃圾回收机对垃圾进行分类。基类是“垃圾”。每块垃圾都有重量、价值等特性，它们可以被切碎、熔化或分解。在此基础上，可以通过添加额外的特性(瓶子有颜色，钢罐有磁性)或行为(铝罐可以被压碎)派生出更具体的垃圾类型。此外，一些行为可以不同（纸张的价值取决于它的类型和状态）。使用继承，你将构建一个类型层次结构，来表示你试图解决的某种类型的问题。第二个例子是常见的“形状”例子，可能用于计算机辅助设计系统或游戏模拟。基类是“形状”，每个形状都有大小、颜色、位置等等。每个形状可以绘制、擦除、移动、着色等。由此，可以派生出（继承出）具体类型的形状——圆形、正方形、三角形等等——每个形状可以具有附加的特征和行为。</p><p><img src="'+c+'" alt="1545764780795"></p><p>例如，某些形状可以翻转。有些行为可能不同，比如计算形状的面积。类型层次结构体现了形状之间的相似性和差异性。以相同的术语将解决方案转换成问题是有用的，因为你不需要在问题描述和解决方案描述之间建立许多中间模型。通过使用对象，类型层次结构成为了主要模型，因此你可以直接从真实世界中对系统的描述过渡到用代码对系统进行描述。事实上，有时候，那些善于寻找复杂解决方案的人会被面向对象设计的简单性难倒。从现有类型继承创建新类型。这种新类型不仅包含现有类型的所有成员（尽管私有成员被隐藏起来并且不可访问），而且更重要的是它复制了基类的接口。也就是说，基类对象接收的所有消息也能被派生类对象接收。根据类接收的消息，我们知道类的类型，因此派生类与基类是相同的类型。</p><p>在前面的例子中，“圆是形状”。这种通过继承的类型等价性是理解面向对象编程含义的基本门槛之一。因为基类和派生类都具有相同的基本接口，所以伴随此接口的必定有某些具体实现。也就是说，当对象接收到特定消息时，必须有可执行代码。如果继承一个类而不做其他任何事，则来自基类接口的方法直接进入派生类。这意味着派生类和基类不仅具有相同的类型，而且具有相同的行为，这么做没什么特别意义。</p><p>有两种方法可以区分新的派生类与原始的基类。第一种方法很简单：在派生类中添加新方法。这些新方法不是基类接口的一部分。这意味着基类不能满足你的所有需求，所以你添加了更多的方法。继承的这种简单而原始的用途有时是解决问题的完美解决方案。然而，还是要仔细考虑是否在基类中也要有这些额外的方法。这种设计的发现与迭代过程在面向对象程序设计中会经常发生。</p><p>尽管继承有时意味着你要在接口中添加新方法（尤其是在以 <strong>extends</strong> 关键字表示继承的 Java 中），但并非总需如此。第二种也是更重要地区分派生类和基类的方法是改变现有基类方法的行为，这被称为覆盖 (overriding)。要想覆盖一个方法，只需要在派生类中重新定义这个方法即可。</p><h3 id="是一个-与-像是一个-的关系" tabindex="-1">&quot;是一个&quot;与&quot;像是一个&quot;的关系 <a class="header-anchor" href="#是一个-与-像是一个-的关系" aria-label="Permalink to &quot;&quot;是一个&quot;与&quot;像是一个&quot;的关系&quot;">​</a></h3><p>对于继承可能会引发争论：继承应该只覆盖基类的方法(不应该添加基类中没有的方法)吗？如果这样的话，基类和派生类就是相同的类型了，因为它们具有相同的接口。这会造成，你可以用一个派生类对象完全替代基类对象，这叫作&quot;纯粹替代&quot;，也经常被称作&quot;替代原则&quot;。在某种意义上，这是一种处理继承的理想方式。我们经常把这种基类和派生类的关系称为是一个（is-a）关系，因为可以说&quot;圆是一个形状&quot;。判断是否继承，就看在你的类之间有无这种 is-a 关系。</p><p>有时你在派生类添加了新的接口元素，从而扩展接口。虽然新类型仍然可以替代基类，但是这种替代不完美，原因在于基类无法访问新添加的方法。这种关系称为像是一个(is-like-a)关系。新类型不但拥有旧类型的接口，而且包含其他方法，所以不能说新旧类型完全相同。</p><p><img src="'+r+'" alt="1545764820176"></p><p>以空调为例，假设房间里已经安装好了制冷设备的控制器，即你有了控制制冷设备的接口。想象一下，现在空调坏了，你重新安装了一个既制冷又制热的热力泵。热力泵就像是一个（is-like-a）空调，但它可以做更多。因为当初房间的控制系统被设计成只能控制制冷设备，所以它只能与新对象(热力泵)的制冷部分通信。新对象的接口已经扩展了，现有控制系统却只知道原来的接口，一旦看到这个设计，你就会发现，作为基类的制冷系统不够一般化，应该被重新命名为&quot;温度控制系统&quot;，也应该包含制热功能，这样的话，我们就可以使用替代原则了。上图反映了在现实世界中进行设计时可能会发生的事情。</p><p>当你看到替代原则时，很容易会认为纯粹替代是唯一可行的方式，并且使用纯粹替代的设计是很好的。但有些时候，你会发现必须得在派生(扩展)类中添加新方法(提供新的接口)。只要仔细审视，你可以很明显地区分两种设计方式的使用场合。</p><h2 id="多态" tabindex="-1">多态 <a class="header-anchor" href="#多态" aria-label="Permalink to &quot;多态&quot;">​</a></h2><p>我们在处理类的层次结构时，通常把一个对象看成是它所属的基类，而不是把它当成具体类。通过这种方式，我们可以编写出不局限于特定类型的代码。在上个“形状”的例子中，“方法”（method）操纵的是通用“形状”，而不关心它们是“圆”、“正方形”、“三角形”还是某种尚未定义的形状。所有的形状都可以被绘制、擦除和移动，因此“方法”向其中的任何代表“形状”的对象发送消息都不必担心对象如何处理信息。</p><p>这样的代码不会受添加的新类型影响，并且添加新类型是扩展面向对象程序以处理新情况的常用方法。 例如，你可以通过通用的“形状”基类派生出新的“五角形”形状的子类，而不需要修改通用&quot;形状&quot;基类的方法。通过派生新的子类来扩展设计的这种能力是封装变化的基本方法之一。</p><p>这种能力改善了我们的设计，且减少了软件的维护代价。如果我们把派生的对象类型统一看成是它本身的基类（“圆”当作“形状”，“自行车”当作“车”，“鸬鹚”当作“鸟”等等），编译器（compiler）在编译时期就无法准确地知道什么“形状”被擦除，哪一种“车”在行驶，或者是哪种“鸟”在飞行。这就是关键所在：当程序接收这种消息时，程序员并不想知道哪段代码会被执行。“绘图”的方法可以平等地应用到每种可能的“形状”上，形状会依据自身的具体类型执行恰当的代码。</p><p>如果不需要知道执行了哪部分代码，那我们就能添加一个新的不同执行方式的子类而不需要更改调用它的方法。那么编译器在不确定该执行哪部分代码时是怎么做的呢？举个例子，下图的 <strong>BirdController</strong> 对象和通用 <strong>Bird</strong> 对象中，<strong>BirdController</strong> 不知道 <strong>Bird</strong> 的确切类型却还能一起工作。从 <strong>BirdController</strong> 的角度来看，这是很方便的，因为它不需要编写特别的代码来确定 <strong>Bird</strong> 对象的确切类型或行为。那么，在调用 <strong>move()</strong> 方法时是如何保证发生正确的行为（鹅走路、飞或游泳、企鹅走路或游泳）的呢？</p><p><img src="'+i+`" alt="Bird-example"></p><p>这个问题的答案，是面向对象程序设计的妙诀：在传统意义上，编译器不能进行函数调用。由非 OOP 编译器产生的函数调用会引起所谓的<strong>早期绑定</strong>，这个术语你可能从未听说过，不会想过其他的函数调用方式。这意味着编译器生成对特定函数名的调用，该调用会被解析为将执行的代码的绝对地址。</p><p>通过继承，程序直到运行时才能确定代码的地址，因此发送消息给对象时，还需要其他一些方案。为了解决这个问题，面向对象语言使用<strong>后期绑定</strong>的概念。当向对象发送信息时，被调用的代码直到运行时才确定。编译器确保方法存在，并对参数和返回值执行类型检查，但是它不知道要执行的确切代码。</p><p>为了执行后期绑定，Java 使用一个特殊的代码位来代替绝对调用。这段代码使用对象中存储的信息来计算方法主体的地址（此过程在多态性章节中有详细介绍）。因此，每个对象的行为根据特定代码位的内容而不同。当你向对象发送消息时，对象知道该如何处理这条消息。在某些语言中，必须显式地授予方法后期绑定属性的灵活性。例如，C++ 使用 <strong>virtual</strong> 关键字。在这些语言中，默认情况下方法不是动态绑定的。在 Java 中，动态绑定是默认行为，不需要额外的关键字来实现多态性。</p><p>为了演示多态性，我们编写了一段代码，它忽略了类型的具体细节，只与基类对话。该代码与具体类型信息分离，因此更易于编写和理解。而且，如果通过继承添加了一个新类型（例如，一个六边形），那么代码对于新类型的 Shape 就像对现有类型一样有效。因此，该程序是可扩展的。</p><p>代码示例：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">(Shape shape) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    shape.</span><span style="color:#B392F0;">erase</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    shape.</span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">(Shape shape) {</span></span>
<span class="line"><span style="color:#24292E;">    shape.</span><span style="color:#6F42C1;">erase</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    shape.</span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>此方法与任何 <strong>Shape</strong> 对话，因此它与所绘制和擦除的对象的具体类型无关。如果程序的其他部分使用 <code>doSomething()</code> 方法：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Circle circle </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Circle</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    Triangle triangle </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Triangle</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    Line line </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Line</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">(circle);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">(triangle);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">(line);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Circle circle </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Circle</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    Triangle triangle </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Triangle</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    Line line </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Line</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">(circle);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">(triangle);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">(line);</span></span></code></pre></div><p>可以看到无论传入的“形状”是什么，程序都正确的执行了。</p><p><img src="`+d+`" alt="shape-example"></p><p>这是一个非常令人惊奇的编程技巧。分析下面这行代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">(circle);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">(circle);</span></span></code></pre></div><p>当预期接收 <strong>Shape</strong> 的方法被传入了 <strong>Circle</strong>，会发生什么。由于 <strong>Circle</strong> 也是一种 <strong>Shape</strong>，所 以 <code>doSomething(circle)</code> 能正确地执行。也就是说，<code>doSomething()</code> 能接收任意发送给 <strong>Shape</strong> 的消息。这是完全安全和合乎逻辑的事情。</p><p>这种把子类当成其基类来处理的过程叫做“向上转型”（<strong>upcasting</strong>）。在面向对象的编程里，经常利用这种方法来给程序解耦。再看下面的 <code>doSomething()</code> 代码示例：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">shape.</span><span style="color:#B392F0;">erase</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    shape.</span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">shape.</span><span style="color:#6F42C1;">erase</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    shape.</span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">();</span></span></code></pre></div><p>我们可以看到程序并未这样表达：“如果你是一个 Circle ，就这样做；如果你是一个 Square，就那样做...”。若那样编写代码，就需检查 Shape 所有可能的类型，如圆、矩形等等。这显然是非常麻烦的，而且每次添加了一种新的 Shape 类型后，都要相应地进行修改。在这里，我们只需说：“你是一种几何形状，我知道你能删掉 <code>erase()</code> 和绘制 <code>draw()</code>，你自己去做吧，注意细节。”</p><p>尽管我们没作出任何特殊指示，程序的操作也是完全正确和恰当的。我们知道，为 Circle 调用<code>draw()</code> 时执行的代码与为一个 Square 或 Line 调用 <code>draw()</code> 时执行的代码是不同的。但在将 <code>draw()</code> 信息发给一个匿名 Shape 时，根据 Shape 句柄当时连接的实际类型，会相应地采取正确的操作。这非常神奇，因为当 Java 编译器为 <code>doSomething()</code> 编译代码时，它并不知道自己要操作的准确类型是什么。</p><p>尽管我们确实可以保证最终会为 Shape 调用 <code>erase()</code> 和 <code>draw()</code>，但并不能确定特定的 Circle，Square 或者 Line 调用什么。最后，程序执行的操作却依然是正确的，这是怎么做到的呢？</p><p>发送消息给对象时，如果程序不知道接收的具体类型是什么，但最终执行是正确的，这就是对象的“多态性”（Polymorphism）。面向对象的程序设计语言是通过“动态绑定”的方式来实现对象的多态性的。编译器和运行时系统会负责对所有细节的控制；我们只需知道要做什么，以及如何利用多态性来更好地设计程序。</p><h2 id="单继承结构" tabindex="-1">单继承结构 <a class="header-anchor" href="#单继承结构" aria-label="Permalink to &quot;单继承结构&quot;">​</a></h2><p>自从 C++ 引入以来，一个 OOP 问题变得尤为突出：是否所有的类都应该默认从一个基类继承呢？这个答案在 Java 中是肯定的（实际上，除 C++ 以外的几乎所有OOP语言中也是这样）。在 Java 中，这个最终基类的名字就是 <code>Object</code>。</p><p>Java 的单继承结构有很多好处。由于所有对象都具有一个公共接口，因此它们最终都属于同一个基类。相反的，对于 C++ 所使用的多继承的方案则是不保证所有的对象都属于同一个基类。从向后兼容的角度看，多继承的方案更符合 C 的模型，而且受限较少。</p><p>对于完全面向对象编程，我们必须要构建自己的层次结构，以提供与其他 OOP 语言同样的便利。我们经常会使用到新的类库和不兼容的接口。为了整合它们而花费大气力（有可能还要用上多继承）以获得 C++ 样的“灵活性”值得吗？如果从零开始，Java 这样的替代方案会是更好的选择。</p><p>另外，单继承的结构使得垃圾收集器的实现更为容易。这也是 Java 在 C++ 基础上的根本改进之一。</p><p>由于运行期的类型信息会存在于所有对象中，所以我们永远不会遇到判断不了对象类型的情况。这对于系统级操作尤其重要，例如<a href="#异常处理">异常处理</a>。同时，这也让我们的编程具有更大的灵活性。</p><h2 id="集合" tabindex="-1">集合 <a class="header-anchor" href="#集合" aria-label="Permalink to &quot;集合&quot;">​</a></h2><p>通常，我们并不知道解决某个具体问题需要的对象数量和持续时间，以及对象的存储方式。那么我们如何知悉程序在运行时需要分配的内存空间呢？</p><p>在面向对象的设计中，问题的解决方案有些过于轻率：创建一个新类型的对象来引用、容纳其他的对象。当然，我们也可以使用多数编程语言都支持的“数组”（array）。在 Java 中“集合”（Collection）的使用率更高。（也可称之为“容器”，但“集合”这个称呼更通用。）</p><p>“集合”这种类型的对象可以存储任意类型、数量的其他对象。它能根据需要自动扩容，我们不用关心过程是如何实现的。</p><p>还好，一般优秀的 OOP 语言都会将“集合”作为其基础包。在 C++ 中，“集合”是其标准库的一部分，通常被称为 STL（Standard Template Library，标准模板库）。SmallTalk 有一套非常完整的集合库。同样，Java 的标准库中也提供许多现成的集合类。</p><p>在一些库中，一两个泛型集合就能满足我们所有的需求了，而在其他一些类库（Java）中，不同类型的集合对应不同的需求：常见的有 List，常用于保存序列；Map，也称为关联数组，常用于将对象与其他对象关联）；Set，只能保存非重复的值；其他还包括如队列（Queue）、树（Tree）、栈（Stack）、堆（Heap）等等。从设计的角度来看，我们真正想要的是一个能够解决某个问题的集合。如果一种集合就满足所有需求，那么我们就不需要剩下的了。之所以选择集合有以下两个原因：</p><ol><li><p>集合可以提供不同类型的接口和外部行为。堆栈、队列的应用场景和集合、列表不同，它们中的一种提供的解决方案可能比其他灵活得多。</p></li><li><p>不同的集合对某些操作有不同的效率。例如，List 的两种基本类型：ArrayList 和 LinkedList。虽然两者具有相同接口和外部行为，但是在某些操作中它们的效率差别很大。在 ArrayList 中随机查找元素是很高效的，而 LinkedList 随机查找效率低下。反之，在 LinkedList 中插入元素的效率要比在 ArrayList 中高。由于底层数据结构的不同，每种集合类型在执行相同的操作时会表现出效率上的差异。</p></li></ol><p>我们可以一开始使用 LinkedList 构建程序，在优化系统性能时改用 ArrayList。通过对 List 接口的抽象，我们可以很容易地将 LinkedList 改为 ArrayList。</p><p>在 Java 5 泛型出来之前，集合中保存的是通用类型 <code>Object</code>。Java 单继承的结构意味着所有元素都基于 <code>Object</code> 类，所以在集合中可以保存任何类型的数据，易于重用。要使用这样的集合，我们先要往集合添加元素。由于 Java 5 版本前的集合只保存 <code>Object</code>，当我们往集合中添加元素时，元素便向上转型成了 <code>Object</code>，从而丢失自己原有的类型特性。这时我们再从集合中取出该元素时，元素的类型变成了 <code>Object</code>。那么我们该怎么将其转回原先具体的类型呢？这里，我们使用了强制类型转换将其转为更具体的类型，这个过程称为对象的“向下转型”。通过“向上转型”，我们知道“圆形”也是一种“形状”，这个过程是安全的。可是我们不能从“Object”看出其就是“圆形”或“形状”，所以除非我们能确定元素的具体类型信息，否则“向下转型”就是不安全的。也不能说这样的错误就是完全危险的，因为一旦我们转化了错误的类型，程序就会运行出错，抛出“运行时异常”（RuntimeException）。（后面的章节会提到） 无论如何，我们要寻找一种在取出集合元素时确定其具体类型的方法。另外，每次取出元素都要做额外的“向下转型”对程序和程序员都是一种开销。以某种方式创建集合，以确认保存元素的具体类型，减少集合元素“向下转型”的开销和可能出现的错误难道不好吗？这种解决方案就是：参数化类型机制（Parameterized Type Mechanism）。</p><p>参数化类型机制可以使得编译器能够自动识别某个 <code>class</code> 的具体类型并正确地执行。举个例子，对集合的参数化类型机制可以让集合仅接受“形状”这种类型的元素，并以“形状”类型取出元素。Java 5 版本支持了参数化类型机制，称之为“泛型”（Generic）。泛型是 Java 5 的主要特性之一。你可以按以下方式向 ArrayList 中添加 Shape（形状）：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">ArrayList&lt;</span><span style="color:#F97583;">Shape</span><span style="color:#E1E4E8;">&gt; shapes </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayList&lt;&gt;();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">ArrayList&lt;</span><span style="color:#D73A49;">Shape</span><span style="color:#24292E;">&gt; shapes </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayList&lt;&gt;();</span></span></code></pre></div><p>泛型的应用，让 Java 的许多标准库和组件都发生了改变。在本书的代码示例中，你也会经常看到泛型的身影。</p><h2 id="对象创建与生命周期" tabindex="-1">对象创建与生命周期 <a class="header-anchor" href="#对象创建与生命周期" aria-label="Permalink to &quot;对象创建与生命周期&quot;">​</a></h2><p>我们在使用对象时要注意的一个关键问题就是对象的创建和销毁方式。每个对象的生存都需要资源，尤其是内存。为了资源的重复利用，当对象不再被使用时，我们应该及时释放资源，清理内存。</p><p>在简单的编程场景下，对象的清理并不是问题。我们创建对象，按需使用，最后销毁它。然而，情况往往要比这更复杂：</p><p>假设，我们正在为机场设计一个空中交通管制的系统（该例也适用于仓库货柜管理、影带出租或者宠物寄养仓库系统）。第一步比较简单：创建一个用来保存飞机的集合，每当有飞机进入交通管制区域时，我们就创建一个“飞机”对象并将其加入到集合中，等到飞机离开时将其从这个集合中清除。与此同时，我们还需要一个记录飞机信息的系统，也许这些数据不像主要控制功能那样引人注意。比如，我们要记录所有飞机中的小型飞机的的信息（比如飞行计划)。此时，我们又创建了第二个集合来记录所有小型飞机。 每当创建一个“飞机”对象的时候，将其放入第一个集合；若它属于小型飞机，也必须同时将其放入第二个集合里。</p><p>现在问题开始棘手了：我们怎么知道何时该清理这些对象呢？当某一个系统处理完成，而其他系统可能还没有处理完成。这样的问题在其他的场景下也可能发生。在 C++ 程序设计中，当使用完一个对象后，必须明确将其删除，这就让问题变复杂了。</p><p>对象的数据在哪？它的生命周期是怎么被控制的？ 在 C++ 设计中采用的观点是效率第一，因此它将选择权交给了程序员。为了获得最大的运行时速度，程序员可以在编写程序时，通过将对象放在栈（Stack，有时称为自动变量或作用域变量）或静态存储区域（static storage area）中来确定内存占用和生存时间。这些区域的对象会被优先分配内存和释放。这种控制在某些情况下非常有用。</p><p>然而相对的，我们也牺牲了程序的灵活性。因为在编写代码时，我们必须要弄清楚对象的数量、生存时间还有类型。如果我们要用它来解决一个相当普遍的问题时（如计算机辅助设计、仓库管理或空中交通管制等），限制就太大了。</p><p>第二种方法是在堆内存（Heap）中动态地创建对象。在这种方式下，直到程序运行我们才能确定需要创建的对象数量、生存时间和类型。什么时候需要，什么时候在堆内存中创建。 因为内存的占用是动态管理的，所以在运行时，在堆内存上开辟空间所需的时间可能比在栈内存上要长（但也不一定）。在栈内存开辟和释放空间通常是一条将栈指针向下移动和一条将栈指针向上移动的汇编指令。开辟堆内存空间的时间取决于内存机制的设计。</p><p>动态方法有这样一个一般性的逻辑假设：对象趋向于变得复杂，因此额外的内存查找和释放对对象的创建影响不大。（原文：<em>The dynamic approach makes the generally logical assumption that objects tend to be complicated, so the extra overhead of finding storage and releasing that storage will not have an important impact on the creation of an object.</em>）此外，更好的灵活性对于问题的解决至关重要。</p><p>Java 使用动态内存分配。每次创建对象时，使用 <code>new</code> 关键字构建该对象的动态实例。这又带来另一个问题：对象的生命周期。较之堆内存，在栈内存中创建对象，编译器能够确定该对象的生命周期并自动销毁它；然而如果你在堆内存创建对象的话，编译器是不知道它的生命周期的。在 C++ 中你必须以编程方式确定何时销毁对象，否则可能导致内存泄漏。Java 的内存管理是建立在垃圾收集器上的，它能自动发现对象不再被使用并释放内存。垃圾收集器的存在带来了极大的便利，它减少了我们之前必须要跟踪的问题和编写相关代码的数量。因此，垃圾收集器提供了更高级别的保险，以防止潜在的内存泄漏问题，这个问题使得许多 C++ 项目没落。</p><p>Java 的垃圾收集器被设计用来解决内存释放的问题（虽然这不包括对象清理的其他方面）。垃圾收集器知道对象什么时候不再被使用并且自动释放内存。结合单继承和仅可在堆中创建对象的机制，Java 的编码过程比用 C++ 要简单得多。我们所要做的决定和要克服的障碍也会少很多！</p><h2 id="异常处理" tabindex="-1">异常处理 <a class="header-anchor" href="#异常处理" aria-label="Permalink to &quot;异常处理&quot;">​</a></h2><p>自编程语言被发明以来，程序的错误处理一直都是个难题。因为很难设计出一个好的错误处理方案，所以许多编程语言都忽略了这个问题，把这个问题丢给了程序类库的设计者。他们提出了在许多情况下都可以工作但很容易被规避的半途而废的措施，通常只需忽略错误。多数错误处理方案的主要问题是：它们依赖程序员之间的约定俗成而不是语言层面的限制。换句话说，如果程序员赶时间或没想起来，这些方案就很容易被忘记。</p><p>异常处理机制将程序错误直接交给编程语言甚至是操作系统。“异常”（Exception）是一个从出错点“抛出”（thrown）后能被特定类型的异常处理程序捕获(catch)的一个对象。它不会干扰程序的正常运行，仅当程序出错的时候才被执行。这让我们的编码更简单：不用再反复检查错误了。另外，异常不像方法返回的错误值和方法设置用来表示发生错误的标志位那样可以被忽略。异常的发生是不会被忽略的，它终究会在某一时刻被处理。</p><p>最后，“异常机制”提供了一种可靠地从错误状况中恢复的方法，使得我们可以编写出更健壮的程序。有时你只要处理好抛出的异常情况并恢复程序的运行即可，无需退出。</p><p>Java 的异常处理机制在编程语言中脱颖而出。Java 从一开始就内置了异常处理，因此你不得不使用它。这是 Java 语言唯一接受的错误报告方法。如果没有编写适当的异常处理代码，你将会收到一条编译时错误消息。这种有保障的一致性有时会让程序的错误处理变得更容易。值得注意的是，异常处理并不是面向对象的特性。尽管在面向对象的语言中异常通常由对象表示，但是在面向对象语言之前也存在异常处理。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><p>面向过程程序包含数据定义和函数调用。要找到程序的意图，你必须要在脑中建立一个模型，弄清函数调用和更底层的概念。这些程序令人困扰，因为它们的表示更多地面向计算机而不是我们要解决的问题，这就是我们在设计程序时需要中间表示的原因。OOP 在面向过程编程的基础上增加了许多新的概念，所以有人会认为使用 Java 来编程会比同等的面向过程编程要更复杂。在这里，我想给大家一个惊喜：通常按照 Java 规范编写的程序会比面向过程程序更容易被理解。</p><p>你看到的是对象的概念，这些概念是站在“问题空间”的（而不是站在计算机角度的“解决方案空间”），以及发送消息给对象以指示该空间中的活动。面向对象编程的一个优点是：设计良好的 Java 程序代码更容易被人阅读理解。由于 Java 类库的复用性，通常程序要写的代码也会少得多。</p><p>OOP 和 Java 不一定适合每个人。评估自己的需求以及与现有方案作比较是很重要的。请充分考虑后再决定是不是选择 Java。如果在可预见的未来，Java 并不能很好的满足你的特定需求，那么你应该去寻找其他替代方案（特别是，我推荐看 Python）。如果你依然选择 Java 作为你的开发语言，我希望你至少应该清楚你选择的是什么，以及为什么选择这个方向。</p>`,124),y=[g];function E(u,m,v,b,k,C){return s(),o("div",null,y)}const L=a(h,[["render",E]]);export{S as __pageData,L as default};
