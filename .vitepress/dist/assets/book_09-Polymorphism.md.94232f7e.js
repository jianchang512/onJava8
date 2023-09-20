import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.c3fbb961.js";const l="/assets/1562204648023.46ab29d0.png",o="/assets/1562252767216.f72bc937.png",e="/assets/1562406479787.bcd7345c.png",c="/assets/1562409366637.35aef793.png",t="/assets/1562409926765.61d22e50.png",C=JSON.parse('{"title":"第九章 多态","description":"","frontmatter":{},"headers":[],"relativePath":"book/09-Polymorphism.md","filePath":"book/09-Polymorphism.md"}'),r={name:"book/09-Polymorphism.md"},E=p(`<p>[TOC]</p><h1 id="第九章-多态" tabindex="-1">第九章 多态 <a class="header-anchor" href="#第九章-多态" aria-label="Permalink to &quot;第九章 多态&quot;">​</a></h1><blockquote><p>曾经有人请教我 “ Babbage 先生，如果输入错误的数字到机器中，会得出正确结果吗？” 我无法理解产生如此问题的概念上的困惑。 —— Charles Babbage (1791 - 1871)</p></blockquote><p>多态是面向对象编程语言中，继数据抽象和继承之外的第三个重要特性。</p><p>多态提供了另一个维度的接口与实现分离，以解耦做什么和怎么做。多态不仅能改善代码的组织，提高代码的可读性，而且能创建有扩展性的程序——无论在最初创建项目时还是在添加新特性时都可以“生长”的程序。</p><p>封装通过合并特征和行为来创建新的数据类型。隐藏实现通过将细节<strong>私有化</strong>把接口与实现分离。这种类型的组织机制对于有面向过程编程背景的人来说，更容易理解。而多态是消除类型之间的耦合。在上一章中，继承允许把一个对象视为它本身的类型或它的基类类型。这样就能把很多派生自一个基类的类型当作同一类型处理，因而一段代码就可以无差别地运行在所有不同的类型上了。多态方法调用允许一种类型表现出与相似类型的区别，只要这些类型派生自一个基类。这种区别是当你通过基类调用时，由方法的不同行为表现出来的。</p><p>在本章中，通过一些基本、简单的例子（这些例子中只保留程序中与多态有关的行为），你将逐步学习多态（也称为<em>动态绑定</em>或<em>后期绑定</em>或<em>运行时绑定</em>）。</p><h2 id="向上转型回顾" tabindex="-1">向上转型回顾 <a class="header-anchor" href="#向上转型回顾" aria-label="Permalink to &quot;向上转型回顾&quot;">​</a></h2><p>在上一章中，你看到了如何把一个对象视作它的自身类型或它的基类类型。这种把一个对象引用当作它的基类引用的做法称为向上转型，因为继承图中基类一般都位于最上方。</p><p>同样你也在下面的音乐乐器例子中发现了问题。即然几个例子都要演奏乐符（<strong>Note</strong>），首先我们先在包中单独创建一个 Note 枚举类：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/music/Note.java</span></span>
<span class="line"><span style="color:#6A737D;">// Notes to play on musical instruments</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism.music;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">enum</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Note</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">MIDDLE_C</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">C_SHARP</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">B_FLAT</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// Etc.</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/music/Note.java</span></span>
<span class="line"><span style="color:#6A737D;">// Notes to play on musical instruments</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism.music;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">enum</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Note</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">MIDDLE_C</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">C_SHARP</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">B_FLAT</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// Etc.</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>枚举已经在”第 6 章初始化和清理“一章中介绍过了。</p><p>这里，<strong>Wind</strong> 是一种 <strong>Instrument</strong>；因此，<strong>Wind</strong> 继承 <strong>Instrument</strong>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/music/Instrument.java</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism.music;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Instrument</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note </span><span style="color:#FFAB70;">n</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Instrument.play()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// polymorphism/music/Wind.java</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism.music;</span></span>
<span class="line"><span style="color:#6A737D;">// Wind objects are instruments</span></span>
<span class="line"><span style="color:#6A737D;">// because they have the same interface:</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Wind</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Instrument</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Redefine interface method:</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note </span><span style="color:#FFAB70;">n</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Wind.play() &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> n);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/music/Instrument.java</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism.music;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Instrument</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note </span><span style="color:#E36209;">n</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Instrument.play()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// polymorphism/music/Wind.java</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism.music;</span></span>
<span class="line"><span style="color:#6A737D;">// Wind objects are instruments</span></span>
<span class="line"><span style="color:#6A737D;">// because they have the same interface:</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Wind</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Instrument</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Redefine interface method:</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note </span><span style="color:#E36209;">n</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Wind.play() &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> n);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>Music</strong> 的方法 <code>tune()</code> 接受一个 <strong>Instrument</strong> 引用，同时也接受任何派生自 <strong>Instrument</strong> 的类引用：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/music/Music.java</span></span>
<span class="line"><span style="color:#6A737D;">// Inheritance &amp; upcasting</span></span>
<span class="line"><span style="color:#6A737D;">// {java polymorphism.music.Music}</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism.music;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Music</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tune</span><span style="color:#E1E4E8;">(Instrument </span><span style="color:#FFAB70;">i</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">        i.</span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note.MIDDLE_C);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Wind flute </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Wind</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">tune</span><span style="color:#E1E4E8;">(flute); </span><span style="color:#6A737D;">// Upcasting</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/music/Music.java</span></span>
<span class="line"><span style="color:#6A737D;">// Inheritance &amp; upcasting</span></span>
<span class="line"><span style="color:#6A737D;">// {java polymorphism.music.Music}</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism.music;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Music</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tune</span><span style="color:#24292E;">(Instrument </span><span style="color:#E36209;">i</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">        i.</span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note.MIDDLE_C);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        Wind flute </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Wind</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">tune</span><span style="color:#24292E;">(flute); </span><span style="color:#6A737D;">// Upcasting</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Wind.play() MIDDLE_C</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Wind.play() MIDDLE_C</span></span></code></pre></div><p>在 <code>main()</code> 中你看到了 <code>tune()</code> 方法传入了一个 <strong>Wind</strong> 引用，而没有做类型转换。这样做是允许的—— <strong>Instrument</strong> 的接口一定存在于 <strong>Wind</strong> 中，因此 <strong>Wind</strong> 继承了 <strong>Instrument</strong>。从 <strong>Wind</strong> 向上转型为 <strong>Instrument</strong> 可能“缩小”接口，但不会比 <strong>Instrument</strong> 的全部接口更少。</p><h3 id="忘掉对象类型" tabindex="-1">忘掉对象类型 <a class="header-anchor" href="#忘掉对象类型" aria-label="Permalink to &quot;忘掉对象类型&quot;">​</a></h3><p><strong>Music.java</strong> 看起来似乎有点奇怪。为什么所有人都故意忘记掉对象类型呢？当向上转型时，就会发生这种情况，而且看起来如果 <code>tune()</code> 接受的参数是一个 <strong>Wind</strong> 引用会更为直观。这会带来一个重要问题：如果你那么做，就要为系统内 <strong>Instrument</strong> 的每种类型都编写一个新的 <code>tune()</code> 方法。假设按照这种推理，再增加 <strong>Stringed</strong> 和 <strong>Brass</strong> 这两种 <strong>Instrument</strong> :</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/music/Music2.java</span></span>
<span class="line"><span style="color:#6A737D;">// Overloading instead of upcasting</span></span>
<span class="line"><span style="color:#6A737D;">// {java polymorphism.music.Music2}</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism.music;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Stringed</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Instrument</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note </span><span style="color:#FFAB70;">n</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Stringed.play() &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> n);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Brass</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Instrument</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note </span><span style="color:#FFAB70;">n</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Brass.play() &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> n);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Music2</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tune</span><span style="color:#E1E4E8;">(Wind </span><span style="color:#FFAB70;">i</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        i.</span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note.MIDDLE_C);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tune</span><span style="color:#E1E4E8;">(Stringed </span><span style="color:#FFAB70;">i</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        i.</span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note.MIDDLE_C);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tune</span><span style="color:#E1E4E8;">(Brass </span><span style="color:#FFAB70;">i</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        i.</span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note.MIDDLE_C);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Wind flute </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Wind</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Stringed violin </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Stringed</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Brass frenchHorn </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Brass</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">tune</span><span style="color:#E1E4E8;">(flute); </span><span style="color:#6A737D;">// No upcasting</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">tune</span><span style="color:#E1E4E8;">(violin);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">tune</span><span style="color:#E1E4E8;">(frenchHorn);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/music/Music2.java</span></span>
<span class="line"><span style="color:#6A737D;">// Overloading instead of upcasting</span></span>
<span class="line"><span style="color:#6A737D;">// {java polymorphism.music.Music2}</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism.music;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Stringed</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Instrument</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note </span><span style="color:#E36209;">n</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Stringed.play() &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> n);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Brass</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Instrument</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note </span><span style="color:#E36209;">n</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Brass.play() &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> n);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Music2</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tune</span><span style="color:#24292E;">(Wind </span><span style="color:#E36209;">i</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        i.</span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note.MIDDLE_C);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tune</span><span style="color:#24292E;">(Stringed </span><span style="color:#E36209;">i</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        i.</span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note.MIDDLE_C);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tune</span><span style="color:#24292E;">(Brass </span><span style="color:#E36209;">i</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        i.</span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note.MIDDLE_C);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        Wind flute </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Wind</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        Stringed violin </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Stringed</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        Brass frenchHorn </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Brass</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">tune</span><span style="color:#24292E;">(flute); </span><span style="color:#6A737D;">// No upcasting</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">tune</span><span style="color:#24292E;">(violin);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">tune</span><span style="color:#24292E;">(frenchHorn);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Wind.play() MIDDLE_C</span></span>
<span class="line"><span style="color:#e1e4e8;">Stringed.play() MIDDLE_C</span></span>
<span class="line"><span style="color:#e1e4e8;">Brass.play() MIDDLE_C</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Wind.play() MIDDLE_C</span></span>
<span class="line"><span style="color:#24292e;">Stringed.play() MIDDLE_C</span></span>
<span class="line"><span style="color:#24292e;">Brass.play() MIDDLE_C</span></span></code></pre></div><p>这样行得通，但是有一个主要缺点：必须为添加的每个新 <strong>Instrument</strong> 类编写特定的方法。这意味着开始时就需要更多的编程，而且以后如果添加类似 <code>tune()</code> 的新方法或 <strong>Instrument</strong> 的新类型时，还有大量的工作要做。考虑到如果你忘记重载某个方法，编译器也不会提示你，这会造成类型的整个处理过程变得难以管理。</p><p>如果只写一个方法以基类作为参数，而不用管是哪个具体派生类，这样会变得更好吗？也就是说，如果忘掉派生类，编写的代码只与基类打交道，会不会更好呢？</p><p>这正是多态所允许的。但是大部分拥有面向过程编程背景的程序员会对多态的运作方式感到一些困惑。</p><h2 id="转机" tabindex="-1">转机 <a class="header-anchor" href="#转机" aria-label="Permalink to &quot;转机&quot;">​</a></h2><p>运行程序后会看到 <strong>Music.java</strong> 的难点。<strong>Wind.play()</strong> 的输出结果正是我们期望的，然而它看起来似乎不应该得出这样的结果。观察 <code>tune()</code> 方法：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tune</span><span style="color:#E1E4E8;">(Instrument i) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    i.</span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note.MIDDLE_C);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tune</span><span style="color:#24292E;">(Instrument i) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    i.</span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note.MIDDLE_C);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>它接受一个 <strong>Instrument</strong> 引用。那么编译器是如何知道这里的 <strong>Instrument</strong> 引用指向的是 <strong>Wind</strong>，而不是 <strong>Brass</strong> 或 <strong>Stringed</strong> 呢？编译器无法得知。为了深入理解这个问题，有必要研究一下<em>绑定</em>这个主题。</p><h3 id="方法调用绑定" tabindex="-1">方法调用绑定 <a class="header-anchor" href="#方法调用绑定" aria-label="Permalink to &quot;方法调用绑定&quot;">​</a></h3><p>将一个方法调用和一个方法主体关联起来称作<em>绑定</em>。若绑定发生在程序运行前（如果有的话，由编译器和链接器实现），叫做<em>前期绑定</em>。你可能从来没有听说这个术语，因为它是面向过程语言不需选择默认的绑定方式，例如在 C 语言中就只有<em>前期绑定</em>这一种方法调用。</p><p>上述程序让人困惑的地方就在于前期绑定，因为编译器只知道一个 <strong>Instrument</strong> 引用，它无法得知究竟会调用哪个方法。</p><p>解决方法就是<em>后期绑定</em>，意味着在运行时根据对象的类型进行绑定。后期绑定也称为<em>动态绑定</em>或<em>运行时绑定</em>。当一种语言实现了后期绑定，就必须具有某种机制在运行时能判断对象的类型，从而调用恰当的方法。也就是说，编译器仍然不知道对象的类型，但是方法调用机制能找到正确的方法体并调用。每种语言的后期绑定机制都不同，但是可以想到，对象中一定存在某种类型信息。</p><p>Java 中除了 <strong>static</strong> 和 <strong>final</strong> 方法（<strong>private</strong> 方法也是隐式的 <strong>final</strong>）外，其他所有方法都是后期绑定。这意味着通常情况下，我们不需要判断后期绑定是否会发生——它自动发生。</p><p>为什么将一个对象指明为 <strong>final</strong> ？正如前一章所述，它可以防止方法被重写。但更重要的一点可能是，它有效地”关闭了“动态绑定，或者说告诉编译器不需要对其进行动态绑定。这可以让编译器为 <strong>final</strong> 方法生成更高效的代码。然而，大部分情况下这样做不会对程序的整体性能带来什么改变，因此最好是为了设计使用 <strong>final</strong>，而不是为了提升性能而使用。</p><h3 id="产生正确的行为" tabindex="-1">产生正确的行为 <a class="header-anchor" href="#产生正确的行为" aria-label="Permalink to &quot;产生正确的行为&quot;">​</a></h3><p>一旦当你知道 Java 中所有方法都是通过后期绑定来实现多态时，就可以编写只与基类打交道的代码，而且代码对于派生类来说都能正常地工作。或者换种说法，你向对象发送一条消息，让对象自己做正确的事。</p><p>面向对象编程中的经典例子是形状 <strong>Shape</strong>。这个例子很直观，但不幸的是，它可能让初学者困惑，认为面向对象编程只适合图形化程序设计，实际上不是这样。</p><p>形状的例子中，有一个基类称为 <strong>Shape</strong> ，多个不同的派生类型分别是：<strong>Circle</strong>，<strong>Square</strong>，<strong>Triangle</strong> 等等。这个例子之所以好用，是因为我们可以直接说“圆(Circle)是一种形状(Shape)”，这很容易理解。继承图展示了它们之间的关系：</p><p><img src="`+l+`" alt="形状继承图"></p><p>向上转型就像下面这么简单：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Shape s </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Circle</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Shape s </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Circle</span><span style="color:#24292E;">();</span></span></code></pre></div><p>这会创建一个 <strong>Circle</strong> 对象，引用被赋值给 <strong>Shape</strong> 类型的变量 s，这看似错误（将一种类型赋值给另一种类型），然而是没问题的，因此从继承上可认为圆(Circle)就是一个形状(Shape)。因此编译器认可了赋值语句，没有报错。</p><p>假设你调用了一个基类方法（在各个派生类中都被重写）：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">s.</span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">s.</span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">()</span></span></code></pre></div><p>你可能再次认为 <strong>Shape</strong> 的 <code>draw()</code> 方法被调用，因为 s 是一个 <strong>Shape</strong> 引用——编译器怎么可能知道要做其他的事呢？然而，由于后期绑定（多态）被调用的是 <strong>Circle</strong> 的 <code>draw()</code> 方法，这是正确的。</p><p>下面的例子稍微有些不同。首先让我们创建一个可复用的 <strong>Shape</strong> 类库，基类 <strong>Shape</strong> 为它的所有子类建立了公共接口——所有的形状都可以被绘画和擦除：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/shape/Shape.java</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism.shape;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Shape</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">erase</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/shape/Shape.java</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism.shape;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Shape</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">erase</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>派生类通过重写这些方法为每个具体的形状提供独一无二的方法行为：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/shape/Circle.java</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism.shape;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Circle</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Shape</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Circle.draw()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">erase</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Circle.erase()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// polymorphism/shape/Square.java</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism.shape;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Square</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Shape</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Square.draw()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">erase</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Square.erase()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// polymorphism/shape/Triangle.java</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism.shape;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Triangle</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Shape</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Triangle.draw()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">erase</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Triangle.erase()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/shape/Circle.java</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism.shape;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Circle</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Shape</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Circle.draw()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">erase</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Circle.erase()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// polymorphism/shape/Square.java</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism.shape;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Square</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Shape</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Square.draw()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">erase</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Square.erase()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// polymorphism/shape/Triangle.java</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism.shape;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Triangle</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Shape</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Triangle.draw()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">erase</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Triangle.erase()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>RandomShapes</strong> 是一种工厂，每当我们调用 <code>get()</code> 方法时，就会产生一个指向随机创建的 <strong>Shape</strong> 对象的引用。注意，向上转型发生在 <strong>return</strong> 语句中，每条 <strong>return</strong> 语句取得一个指向某个 <strong>Circle</strong>，<strong>Square</strong> 或 <strong>Triangle</strong> 的引用， 并将其以 <strong>Shape</strong> 类型从 <code>get()</code> 方法发送出去。因此无论何时调用 <code>get()</code> 方法，你都无法知道具体的类型是什么，因为你总是得到一个简单的 <strong>Shape</strong> 引用：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/shape/RandomShapes.java</span></span>
<span class="line"><span style="color:#6A737D;">// A &quot;factory&quot; that randomly creates shapes</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism.shape;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RandomShapes</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Random rand </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Random</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">47</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Shape </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;">(rand.</span><span style="color:#B392F0;">nextInt</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">default:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Circle</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Square</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Triangle</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Shape</span><span style="color:#E1E4E8;">[] </span><span style="color:#B392F0;">array</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">sz</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">Shape</span><span style="color:#E1E4E8;">[] shapes </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Shape</span><span style="color:#E1E4E8;">[sz];</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Fill up the array with shapes:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> shapes.length; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            shapes[i] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> shapes;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/shape/RandomShapes.java</span></span>
<span class="line"><span style="color:#6A737D;">// A &quot;factory&quot; that randomly creates shapes</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism.shape;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RandomShapes</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Random rand </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Random</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">47</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Shape </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">switch</span><span style="color:#24292E;">(rand.</span><span style="color:#6F42C1;">nextInt</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">default:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Circle</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Square</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Triangle</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Shape</span><span style="color:#24292E;">[] </span><span style="color:#6F42C1;">array</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">sz</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">Shape</span><span style="color:#24292E;">[] shapes </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Shape</span><span style="color:#24292E;">[sz];</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Fill up the array with shapes:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> shapes.length; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            shapes[i] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> shapes;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>array()</code> 方法分配并填充了 <strong>Shape</strong> 数组，这里使用了 for-in 表达式：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/Shapes.java</span></span>
<span class="line"><span style="color:#6A737D;">// Polymorphism in Java</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> polymorphism.shape.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Shapes</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        RandomShapes gen </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RandomShapes</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Make polymorphic method calls:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (Shape shape</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> gen.</span><span style="color:#B392F0;">array</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">9</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            shape.</span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/Shapes.java</span></span>
<span class="line"><span style="color:#6A737D;">// Polymorphism in Java</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> polymorphism.shape.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Shapes</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        RandomShapes gen </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RandomShapes</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Make polymorphic method calls:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (Shape shape</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> gen.</span><span style="color:#6F42C1;">array</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">9</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">            shape.</span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Triangle.draw()</span></span>
<span class="line"><span style="color:#e1e4e8;">Triangle.draw()</span></span>
<span class="line"><span style="color:#e1e4e8;">Square.draw()</span></span>
<span class="line"><span style="color:#e1e4e8;">Triangle.draw()</span></span>
<span class="line"><span style="color:#e1e4e8;">Square.draw()</span></span>
<span class="line"><span style="color:#e1e4e8;">Triangle.draw()</span></span>
<span class="line"><span style="color:#e1e4e8;">Square.draw()</span></span>
<span class="line"><span style="color:#e1e4e8;">Triangle.draw()</span></span>
<span class="line"><span style="color:#e1e4e8;">Circle.draw()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Triangle.draw()</span></span>
<span class="line"><span style="color:#24292e;">Triangle.draw()</span></span>
<span class="line"><span style="color:#24292e;">Square.draw()</span></span>
<span class="line"><span style="color:#24292e;">Triangle.draw()</span></span>
<span class="line"><span style="color:#24292e;">Square.draw()</span></span>
<span class="line"><span style="color:#24292e;">Triangle.draw()</span></span>
<span class="line"><span style="color:#24292e;">Square.draw()</span></span>
<span class="line"><span style="color:#24292e;">Triangle.draw()</span></span>
<span class="line"><span style="color:#24292e;">Circle.draw()</span></span></code></pre></div><p><code>main()</code> 方法中包含了一个 <strong>Shape</strong> 引用组成的数组，其中每个元素通过调用 <strong>RandomShapes</strong> 类的 <code>get()</code> 方法生成。现在你只知道拥有一些形状，但除此之外一无所知（编译器也是如此）。然而当遍历这个数组为每个元素调用 <code>draw()</code> 方法时，从运行程序的结果中可以看到，与类型有关的特定行为奇迹般地发生了。</p><p>随机生成形状是为了让大家理解：在编译时，编译器不需要知道任何具体信息以进行正确的调用。所有对方法 <code>draw()</code> 的调用都是通过动态绑定进行的。</p><h3 id="可扩展性" tabindex="-1">可扩展性 <a class="header-anchor" href="#可扩展性" aria-label="Permalink to &quot;可扩展性&quot;">​</a></h3><p>现在让我们回头看音乐乐器的例子。由于多态机制，你可以向系统中添加任意多的新类型，而不需要修改 <code>tune()</code> 方法。在一个设计良好的面向对象程序中，许多方法将会遵循 <code>tune()</code> 的模型，只与基类接口通信。这样的程序是可扩展的，因为可以从通用的基类派生出新的数据类型，从而添加新的功能。那些操纵基类接口的方法不需要改动就可以应用于新类。</p><p>考虑一下乐器的例子，如果在基类中添加更多的方法，并加入一些新类，将会发生什么呢：</p><p><img src="`+o+`" alt="乐器继承图"></p><p>所有的新类都可以和原有类正常运行，不需要改动 <code>tune()</code> 方法。即使 <code>tune()</code> 方法单独存放在某个文件中，而且向 <strong>Instrument</strong> 接口中添加了新的方法，<code>tune()</code> 方法也无需再编译就能正确运行。下面是类图的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/music3/Music3.java</span></span>
<span class="line"><span style="color:#6A737D;">// An extensible program</span></span>
<span class="line"><span style="color:#6A737D;">// {java polymorphism.music3.Music3}</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism.music3;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> polymorphism.music.Note;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Instrument</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note </span><span style="color:#FFAB70;">n</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Instrument.play() &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> n);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    String </span><span style="color:#B392F0;">what</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Instrument&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">adjust</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Adjusting Instrument&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Wind</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Instrument</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note </span><span style="color:#FFAB70;">n</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Wind.play() &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> n);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    String </span><span style="color:#B392F0;">what</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Wind&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">adjust</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Adjusting Wind&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Percussion</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Instrument</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note </span><span style="color:#FFAB70;">n</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Percussion.play() &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> n);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    String </span><span style="color:#B392F0;">what</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Percussion&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">adjust</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Adjusting Percussion&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Stringed</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Instrument</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note </span><span style="color:#FFAB70;">n</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Stringed.play() &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> n);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    String </span><span style="color:#B392F0;">what</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Stringed&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">adjust</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Adjusting Stringed&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Brass</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Wind</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note </span><span style="color:#FFAB70;">n</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Brass.play() &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> n);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">adjust</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Adjusting Brass&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Woodwind</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Wind</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note </span><span style="color:#FFAB70;">n</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Woodwind.play() &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> n);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    String </span><span style="color:#B392F0;">what</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Woodwind&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Music3</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Doesn&#39;t care about type, so new types</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// added to the system still work right:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tune</span><span style="color:#E1E4E8;">(Instrument </span><span style="color:#FFAB70;">i</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">        i.</span><span style="color:#B392F0;">play</span><span style="color:#E1E4E8;">(Note.MIDDLE_C);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tuneAll</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">Instrument</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (Instrument i</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">tune</span><span style="color:#E1E4E8;">(i);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Upcasting during addition to the array:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">Instrument</span><span style="color:#E1E4E8;">[] orchestra </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Wind</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Percussion</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Stringed</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Brass</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Woodwind</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        };</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">tuneAll</span><span style="color:#E1E4E8;">(orchestra);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/music3/Music3.java</span></span>
<span class="line"><span style="color:#6A737D;">// An extensible program</span></span>
<span class="line"><span style="color:#6A737D;">// {java polymorphism.music3.Music3}</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism.music3;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> polymorphism.music.Note;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Instrument</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note </span><span style="color:#E36209;">n</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Instrument.play() &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> n);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    String </span><span style="color:#6F42C1;">what</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Instrument&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">adjust</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Adjusting Instrument&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Wind</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Instrument</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note </span><span style="color:#E36209;">n</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Wind.play() &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> n);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    String </span><span style="color:#6F42C1;">what</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Wind&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">adjust</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Adjusting Wind&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Percussion</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Instrument</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note </span><span style="color:#E36209;">n</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Percussion.play() &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> n);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    String </span><span style="color:#6F42C1;">what</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Percussion&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">adjust</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Adjusting Percussion&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Stringed</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Instrument</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note </span><span style="color:#E36209;">n</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Stringed.play() &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> n);</span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    String </span><span style="color:#6F42C1;">what</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Stringed&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">adjust</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Adjusting Stringed&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Brass</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Wind</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note </span><span style="color:#E36209;">n</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Brass.play() &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> n);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">adjust</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Adjusting Brass&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Woodwind</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Wind</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note </span><span style="color:#E36209;">n</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Woodwind.play() &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> n);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    String </span><span style="color:#6F42C1;">what</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Woodwind&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Music3</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Doesn&#39;t care about type, so new types</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// added to the system still work right:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tune</span><span style="color:#24292E;">(Instrument </span><span style="color:#E36209;">i</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">        i.</span><span style="color:#6F42C1;">play</span><span style="color:#24292E;">(Note.MIDDLE_C);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tuneAll</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">Instrument</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (Instrument i</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> e) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">tune</span><span style="color:#24292E;">(i);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Upcasting during addition to the array:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">Instrument</span><span style="color:#24292E;">[] orchestra </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Wind</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Percussion</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Stringed</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Brass</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Woodwind</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        };</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">tuneAll</span><span style="color:#24292E;">(orchestra);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Wind.play() MIDDLE_C</span></span>
<span class="line"><span style="color:#e1e4e8;">Percussion.play() MIDDLE_C</span></span>
<span class="line"><span style="color:#e1e4e8;">Stringed.play() MIDDLE_C</span></span>
<span class="line"><span style="color:#e1e4e8;">Brass.play() MIDDLE_C</span></span>
<span class="line"><span style="color:#e1e4e8;">Woodwind.play() MIDDLE_C</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Wind.play() MIDDLE_C</span></span>
<span class="line"><span style="color:#24292e;">Percussion.play() MIDDLE_C</span></span>
<span class="line"><span style="color:#24292e;">Stringed.play() MIDDLE_C</span></span>
<span class="line"><span style="color:#24292e;">Brass.play() MIDDLE_C</span></span>
<span class="line"><span style="color:#24292e;">Woodwind.play() MIDDLE_C</span></span></code></pre></div><p>新方法 <code>what()</code> 返回一个带有类描述的 <strong>String</strong> 引用，<code>adjust()</code> 提供一些乐器调音的方法。</p><p>在 <code>main()</code> 方法中，当向 <strong>orchestra</strong> 数组添加元素时，元素会自动向上转型为 <strong>Instrument</strong>。</p><p><code>tune()</code> 方法可以忽略周围所有代码发生的变化，仍然可以正常运行。这正是我们期待多态能提供的特性。代码中的修改不会破坏程序中其他不应受到影响的部分。换句话说，多态是一项“将改变的事物与不变的事物分离”的重要技术。</p><h3 id="陷阱-重写-私有方法" tabindex="-1">陷阱：“重写”私有方法 <a class="header-anchor" href="#陷阱-重写-私有方法" aria-label="Permalink to &quot;陷阱：“重写”私有方法&quot;">​</a></h3><p>你可能天真地试图像下面这样做：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/PrivateOverride.java</span></span>
<span class="line"><span style="color:#6A737D;">// Trying to override a private method</span></span>
<span class="line"><span style="color:#6A737D;">// {java polymorphism.PrivateOverride}</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PrivateOverride</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;private f()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        PrivateOverride po </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Derived</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        po.</span><span style="color:#B392F0;">f</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Derived extends PrivateOverride {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;public f()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/PrivateOverride.java</span></span>
<span class="line"><span style="color:#6A737D;">// Trying to override a private method</span></span>
<span class="line"><span style="color:#6A737D;">// {java polymorphism.PrivateOverride}</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PrivateOverride</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;private f()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        PrivateOverride po </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Derived</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        po.</span><span style="color:#6F42C1;">f</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Derived extends PrivateOverride {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;public f()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">private f()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">private f()</span></span></code></pre></div><p>你可能期望输出是 <strong>public f()</strong>，然而 <strong>private</strong> 方法可以当作是 <strong>final</strong> 的，对于派生类来说是隐蔽的。因此，这里 <strong>Derived</strong> 的 <code>f()</code> 是一个全新的方法；因为基类版本的 <code>f()</code> 屏蔽了 <strong>Derived</strong> ，因此它都不算是重写方法。</p><p>结论是只有非 <strong>private</strong> 方法才能被重写，但是得小心重写 <strong>private</strong> 方法的现象，编译器不报错，但不会按我们所预期的执行。为了清晰起见，派生类中的方法名采用与基类中 <strong>private</strong> 方法名不同的命名。</p><p>如果使用了 <code>@Override</code> 注解，就能检测出问题：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/PrivateOverride2.java</span></span>
<span class="line"><span style="color:#6A737D;">// Detecting a mistaken override using @Override</span></span>
<span class="line"><span style="color:#6A737D;">// {WillNotCompile}</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PrivateOverride2</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;private f()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        PrivateOverride2 po </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Derived2</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        po.</span><span style="color:#B392F0;">f</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Derived2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PrivateOverride2</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;public f()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/PrivateOverride2.java</span></span>
<span class="line"><span style="color:#6A737D;">// Detecting a mistaken override using @Override</span></span>
<span class="line"><span style="color:#6A737D;">// {WillNotCompile}</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PrivateOverride2</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;private f()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        PrivateOverride2 po </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Derived2</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        po.</span><span style="color:#6F42C1;">f</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Derived2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PrivateOverride2</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;public f()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>编译器报错信息是：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">error: method does not override or</span></span>
<span class="line"><span style="color:#e1e4e8;">implement a method from a supertype</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">error: method does not override or</span></span>
<span class="line"><span style="color:#24292e;">implement a method from a supertype</span></span></code></pre></div><h3 id="陷阱-属性与静态方法" tabindex="-1">陷阱：属性与静态方法 <a class="header-anchor" href="#陷阱-属性与静态方法" aria-label="Permalink to &quot;陷阱：属性与静态方法&quot;">​</a></h3><p>一旦学会了多态，就可以以多态的思维方式考虑每件事。然而，只有普通的方法调用可以是多态的。例如，如果你直接访问一个属性，该访问会在编译时解析：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/FieldAccess.java</span></span>
<span class="line"><span style="color:#6A737D;">// Direct field access is determined at compile time</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Super</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> field </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getField</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> field;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Sub</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Super</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> field </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getField</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> field;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getSuperField</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.field;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FieldAccess</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Super sup </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Sub</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// Upcast</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;sup.field = &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> sup.field </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                          </span><span style="color:#9ECBFF;">&quot;, sup.getField() = &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> sup.</span><span style="color:#B392F0;">getField</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        Sub sub </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Sub</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;sub.field = &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> sub.field </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                          </span><span style="color:#9ECBFF;">&quot;, sub.getField() = &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> sub.</span><span style="color:#B392F0;">getField</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">                          </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;, sub.getSuperField() = &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> sub.</span><span style="color:#B392F0;">getSuperField</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/FieldAccess.java</span></span>
<span class="line"><span style="color:#6A737D;">// Direct field access is determined at compile time</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Super</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> field </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getField</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> field;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Sub</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Super</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> field </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getField</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> field;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getSuperField</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.field;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FieldAccess</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        Super sup </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Sub</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// Upcast</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;sup.field = &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> sup.field </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                          </span><span style="color:#032F62;">&quot;, sup.getField() = &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> sup.</span><span style="color:#6F42C1;">getField</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        Sub sub </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Sub</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;sub.field = &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> sub.field </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                          </span><span style="color:#032F62;">&quot;, sub.getField() = &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> sub.</span><span style="color:#6F42C1;">getField</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">                          </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;, sub.getSuperField() = &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> sub.</span><span style="color:#6F42C1;">getSuperField</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">sup.field = 0, sup.getField() = 1</span></span>
<span class="line"><span style="color:#e1e4e8;">sub.field = 1, sub.getField() = 1, sub.getSuperField() = 0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">sup.field = 0, sup.getField() = 1</span></span>
<span class="line"><span style="color:#24292e;">sub.field = 1, sub.getField() = 1, sub.getSuperField() = 0</span></span></code></pre></div><p>当 <strong>Sub</strong> 对象向上转型为 <strong>Super</strong> 引用时，任何属性访问都被编译器解析，因此不是多态的。在这个例子中，<strong>Super.field</strong> 和 <strong>Sub.field</strong> 被分配了不同的存储空间，因此，<strong>Sub</strong> 实际上包含了两个称为 <strong>field</strong> 的属性：它自己的和来自 <strong>Super</strong> 的。然而，在引用 <strong>Sub</strong> 的 <strong>field</strong> 时，默认的 <strong>field</strong> 属性并不是 <strong>Super</strong> 版本的 <strong>field</strong> 属性。为了获取 <strong>Super</strong> 的 <strong>field</strong> 属性，需要显式地指明 <strong>super.field</strong>。</p><p>尽管这看起来是个令人困惑的问题，实际上基本不会发生。首先，通常会将所有的属性都指明为 <strong>private</strong>，因此不能直接访问它们，只能通过方法来访问。此外，你可能也不会给基类属性和派生类属性起相同的名字，这样做会令人困惑。</p><p>如果一个方法是静态(<strong>static</strong>)的，它的行为就不具有多态性：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/StaticPolymorphism.java</span></span>
<span class="line"><span style="color:#6A737D;">// static methods are not polymorphic</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StaticSuper</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">staticGet</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Base staticGet()&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">dynamicGet</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Base dynamicGet()&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StaticSub</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StaticSuper</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">staticGet</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Derived staticGet()&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">dynamicGet</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Derived dynamicGet()&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StaticPolymorphism</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        StaticSuper sup </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StaticSub</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// Upcast</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(StaticSuper.</span><span style="color:#B392F0;">staticGet</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(sup.</span><span style="color:#B392F0;">dynamicGet</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/StaticPolymorphism.java</span></span>
<span class="line"><span style="color:#6A737D;">// static methods are not polymorphic</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StaticSuper</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">staticGet</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Base staticGet()&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">dynamicGet</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Base dynamicGet()&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StaticSub</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StaticSuper</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">staticGet</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Derived staticGet()&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">dynamicGet</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Derived dynamicGet()&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StaticPolymorphism</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        StaticSuper sup </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StaticSub</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// Upcast</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(StaticSuper.</span><span style="color:#6F42C1;">staticGet</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(sup.</span><span style="color:#6F42C1;">dynamicGet</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Base staticGet()</span></span>
<span class="line"><span style="color:#e1e4e8;">Derived dynamicGet()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Base staticGet()</span></span>
<span class="line"><span style="color:#24292e;">Derived dynamicGet()</span></span></code></pre></div><p>静态的方法只与类关联，与单个的对象无关。</p><h2 id="构造器和多态" tabindex="-1">构造器和多态 <a class="header-anchor" href="#构造器和多态" aria-label="Permalink to &quot;构造器和多态&quot;">​</a></h2><p>通常，构造器不同于其他类型的方法。在涉及多态时也是如此。尽管构造器不具有多态性（事实上人们会把它看作是隐式声明的静态方法），但是理解构造器在复杂层次结构中运作多态还是非常重要的。这个理解可以帮助你避免一些不愉快的困扰。</p><h3 id="构造器调用顺序" tabindex="-1">构造器调用顺序 <a class="header-anchor" href="#构造器调用顺序" aria-label="Permalink to &quot;构造器调用顺序&quot;">​</a></h3><p>在“初始化和清理”和“复用”两章中已经简单地介绍过构造器的调用顺序，但那时还没有介绍多态。</p><p>在派生类的构造过程中总会调用基类的构造器。初始化会自动按继承层次结构上移，因此每个基类的构造器都会被调用到。这么做是有意义的，因为构造器有着特殊的任务：检查对象是否被正确地构造。由于属性通常声明为 <strong>private</strong>，你必须假定派生类只能访问自己的成员而不能访问基类的成员。只有基类的构造器拥有恰当的知识和权限来初始化自身的元素。因此，必须得调用所有构造器；否则就不能构造完整的对象。这就是为什么编译器会强制调用每个派生类中的构造器的原因。如果在派生类的构造器主体中没有显式地调用基类构造器，编译器就会默默地调用无参构造器。如果没有无参构造器，编译器就会报错（当类中不含构造器时，编译器会自动合成一个无参构造器）。</p><p>下面的例子展示了组合、继承和多态在构建顺序上的作用：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/Sandwich.java</span></span>
<span class="line"><span style="color:#6A737D;">// Order of constructor calls</span></span>
<span class="line"><span style="color:#6A737D;">// {java polymorphism.Sandwich}</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Meal</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Meal</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Meal()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Bread</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Bread</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Bread()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Cheese</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Cheese</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Cheese()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Lettuce</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Lettuce</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Lettuce()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Lunch</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Meal</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Lunch</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Lunch()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PortableLunch</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Lunch</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">PortableLunch</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;PortableLunch()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Sandwich</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PortableLunch</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Bread b </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Bread</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Cheese c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Cheese</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Lettuce l </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Lettuce</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Sandwich</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Sandwich()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Sandwich</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/Sandwich.java</span></span>
<span class="line"><span style="color:#6A737D;">// Order of constructor calls</span></span>
<span class="line"><span style="color:#6A737D;">// {java polymorphism.Sandwich}</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Meal</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Meal</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Meal()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Bread</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Bread</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Bread()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Cheese</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Cheese</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Cheese()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Lettuce</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Lettuce</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Lettuce()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Lunch</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Meal</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Lunch</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Lunch()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PortableLunch</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Lunch</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">PortableLunch</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;PortableLunch()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Sandwich</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PortableLunch</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Bread b </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Bread</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Cheese c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Cheese</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Lettuce l </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Lettuce</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Sandwich</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Sandwich()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Sandwich</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Meal()</span></span>
<span class="line"><span style="color:#e1e4e8;">Lunch()</span></span>
<span class="line"><span style="color:#e1e4e8;">PortableLunch()</span></span>
<span class="line"><span style="color:#e1e4e8;">Bread()</span></span>
<span class="line"><span style="color:#e1e4e8;">Cheese()</span></span>
<span class="line"><span style="color:#e1e4e8;">Lettuce()</span></span>
<span class="line"><span style="color:#e1e4e8;">Sandwich()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Meal()</span></span>
<span class="line"><span style="color:#24292e;">Lunch()</span></span>
<span class="line"><span style="color:#24292e;">PortableLunch()</span></span>
<span class="line"><span style="color:#24292e;">Bread()</span></span>
<span class="line"><span style="color:#24292e;">Cheese()</span></span>
<span class="line"><span style="color:#24292e;">Lettuce()</span></span>
<span class="line"><span style="color:#24292e;">Sandwich()</span></span></code></pre></div><p>这个例子用其他类创建了一个复杂的类。每个类都在构造器中声明自己。重要的类是 <strong>Sandwich</strong>，它反映了三层继承（如果算上 <strong>Object</strong> 的话，就是四层），包含了三个成员对象。</p><p>从创建 <strong>Sandwich</strong> 对象的输出中可以看出对象的构造器调用顺序如下：</p><ol><li>基类构造器被调用。这个步骤被递归地重复，这样一来类层次的顶级父类会被最先构造，然后是它的派生类，以此类推，直到最底层的派生类。</li><li>按声明顺序初始化成员。</li><li>调用派生类构造器的方法体。</li></ol><p>构造器的调用顺序很重要。当使用继承时，就已经知道了基类的一切，并可以访问基类中任意 <strong>public</strong> 和 <strong>protected</strong> 的成员。这意味着在派生类中可以假定所有的基类成员都是有效的。在一个标准方法中，构造动作已经发生过，对象其他部分的所有成员都已经创建好。</p><p>在构造器中必须确保所有的成员都已经构建完。唯一能保证这点的方法就是首先调用基类的构造器。接着，在派生类的构造器中，所有你可以访问的基类成员都已经初始化。另一个在构造器中能知道所有成员都是有效的理由是：无论何时有可能的话，你应该在所有成员对象（通过组合将对象置于类中）定义处初始化它们（例如，例子中的 <strong>b</strong>、<strong>c</strong> 和 <strong>l</strong>）。如果遵循这条实践，就可以帮助确保所有的基类成员和当前对象的成员对象都已经初始化。</p><p>不幸的是，这不能处理所有情况，在下一节会看到。</p><h3 id="继承和清理" tabindex="-1">继承和清理 <a class="header-anchor" href="#继承和清理" aria-label="Permalink to &quot;继承和清理&quot;">​</a></h3><p>在使用组合和继承创建新类时，大部分时候你无需关心清理。子对象通常会留给垃圾收集器处理。如果你存在清理问题，那么必须用心地为新类创建一个 <code>dispose()</code> 方法（这里用的是我选择的名称，你可以使用更好的名称）。由于继承，如果有其他特殊的清理工作的话，就必须在派生类中重写 <code>dispose()</code> 方法。当重写 <code>dispose()</code> 方法时，记得调用基类的 <code>dispose()</code> 方法，否则基类的清理工作不会发生：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/Frog.java</span></span>
<span class="line"><span style="color:#6A737D;">// Cleanup and inheritance</span></span>
<span class="line"><span style="color:#6A737D;">// {java polymorphism.Frog}</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> polymorphism;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Characteristic</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String s;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Characteristic</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">s</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.s </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> s;</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Creating Characteristic &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> s);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;disposing Characteristic &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> s);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Description</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String s;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Description</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">s</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.s </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> s;</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Creating Description &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> s);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;disposing Description &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> s);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LivingCreature</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Characteristic p </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Characteristic</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;is alive&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Description t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Description</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Basic Living Creature&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">LivingCreature</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;LivingCreature()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;LivingCreature dispose&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        t.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        p.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Animal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LivingCreature</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Characteristic p </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Characteristic</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;has heart&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Description t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Description</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Animal not Vegetable&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Animal</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Animal()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Animal dispose&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        t.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        p.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Amphibian</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Animal</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Characteristic p </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Characteristic</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;can live in water&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Description t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Description</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Both water and land&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Amphibian</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Amphibian()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Amphibian dispose&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        t.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        p.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Frog</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Amphibian</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Characteristic p </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Characteristic</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Croaks&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Description t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Description</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Eats Bugs&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Frog</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Frog()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Frog dispose&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        t.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        p.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Frog frog </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Frog</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Bye!&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        frog.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/Frog.java</span></span>
<span class="line"><span style="color:#6A737D;">// Cleanup and inheritance</span></span>
<span class="line"><span style="color:#6A737D;">// {java polymorphism.Frog}</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> polymorphism;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Characteristic</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String s;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Characteristic</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">s</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.s </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> s;</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Creating Characteristic &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> s);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;disposing Characteristic &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> s);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Description</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String s;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Description</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">s</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.s </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> s;</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Creating Description &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> s);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;disposing Description &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> s);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LivingCreature</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Characteristic p </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Characteristic</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;is alive&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Description t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Description</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Basic Living Creature&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">LivingCreature</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;LivingCreature()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;LivingCreature dispose&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        t.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        p.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Animal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LivingCreature</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Characteristic p </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Characteristic</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;has heart&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Description t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Description</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Animal not Vegetable&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Animal</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Animal()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Animal dispose&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        t.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        p.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Amphibian</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Animal</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Characteristic p </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Characteristic</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;can live in water&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Description t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Description</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Both water and land&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Amphibian</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Amphibian()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Amphibian dispose&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        t.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        p.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Frog</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Amphibian</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Characteristic p </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Characteristic</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Croaks&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Description t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Description</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Eats Bugs&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Frog</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Frog()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Frog dispose&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        t.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        p.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        Frog frog </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Frog</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Bye!&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        frog.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Creating Characteristic is alive</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating Description Basic Living Creature</span></span>
<span class="line"><span style="color:#e1e4e8;">LivingCreature()</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating Characteristiv has heart</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating Description Animal not Vegetable</span></span>
<span class="line"><span style="color:#e1e4e8;">Animal()</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating Characteristic can live in water</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating Description Both water and land</span></span>
<span class="line"><span style="color:#e1e4e8;">Amphibian()</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating Characteristic Croaks</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating Description Eats Bugs</span></span>
<span class="line"><span style="color:#e1e4e8;">Frog()</span></span>
<span class="line"><span style="color:#e1e4e8;">Bye!</span></span>
<span class="line"><span style="color:#e1e4e8;">Frog dispose</span></span>
<span class="line"><span style="color:#e1e4e8;">disposing Description Eats Bugs</span></span>
<span class="line"><span style="color:#e1e4e8;">disposing Characteristic Croaks</span></span>
<span class="line"><span style="color:#e1e4e8;">Amphibian dispose</span></span>
<span class="line"><span style="color:#e1e4e8;">disposing Description Both wanter and land</span></span>
<span class="line"><span style="color:#e1e4e8;">disposing Characteristic can live in water</span></span>
<span class="line"><span style="color:#e1e4e8;">Animal dispose</span></span>
<span class="line"><span style="color:#e1e4e8;">disposing Description Animal not Vegetable</span></span>
<span class="line"><span style="color:#e1e4e8;">disposing Characteristic has heart</span></span>
<span class="line"><span style="color:#e1e4e8;">LivingCreature dispose</span></span>
<span class="line"><span style="color:#e1e4e8;">disposing Description Basic Living Creature</span></span>
<span class="line"><span style="color:#e1e4e8;">disposing Characteristic is alive</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Creating Characteristic is alive</span></span>
<span class="line"><span style="color:#24292e;">Creating Description Basic Living Creature</span></span>
<span class="line"><span style="color:#24292e;">LivingCreature()</span></span>
<span class="line"><span style="color:#24292e;">Creating Characteristiv has heart</span></span>
<span class="line"><span style="color:#24292e;">Creating Description Animal not Vegetable</span></span>
<span class="line"><span style="color:#24292e;">Animal()</span></span>
<span class="line"><span style="color:#24292e;">Creating Characteristic can live in water</span></span>
<span class="line"><span style="color:#24292e;">Creating Description Both water and land</span></span>
<span class="line"><span style="color:#24292e;">Amphibian()</span></span>
<span class="line"><span style="color:#24292e;">Creating Characteristic Croaks</span></span>
<span class="line"><span style="color:#24292e;">Creating Description Eats Bugs</span></span>
<span class="line"><span style="color:#24292e;">Frog()</span></span>
<span class="line"><span style="color:#24292e;">Bye!</span></span>
<span class="line"><span style="color:#24292e;">Frog dispose</span></span>
<span class="line"><span style="color:#24292e;">disposing Description Eats Bugs</span></span>
<span class="line"><span style="color:#24292e;">disposing Characteristic Croaks</span></span>
<span class="line"><span style="color:#24292e;">Amphibian dispose</span></span>
<span class="line"><span style="color:#24292e;">disposing Description Both wanter and land</span></span>
<span class="line"><span style="color:#24292e;">disposing Characteristic can live in water</span></span>
<span class="line"><span style="color:#24292e;">Animal dispose</span></span>
<span class="line"><span style="color:#24292e;">disposing Description Animal not Vegetable</span></span>
<span class="line"><span style="color:#24292e;">disposing Characteristic has heart</span></span>
<span class="line"><span style="color:#24292e;">LivingCreature dispose</span></span>
<span class="line"><span style="color:#24292e;">disposing Description Basic Living Creature</span></span>
<span class="line"><span style="color:#24292e;">disposing Characteristic is alive</span></span></code></pre></div><p>层级结构中的每个类都有 <strong>Characteristic</strong> 和 <strong>Description</strong> 两个类型的成员对象，它们必须得被销毁。销毁的顺序应该与初始化的顺序相反，以防一个对象依赖另一个对象。对于属性来说，就意味着与声明的顺序相反（因为属性是按照声明顺序初始化的）。对于基类（遵循 C++ 析构函数的形式），首先进行派生类的清理工作，然后才是基类的清理。这是因为派生类的清理可能调用基类的一些方法，所以基类组件这时得存活，不能过早地被销毁。输出显示了，<strong>Frog</strong> 对象的所有部分都是按照创建的逆序销毁的。</p><p>尽管通常不必进行清理工作，但万一需要时，就得谨慎小心地执行。</p><p><strong>Frog</strong> 对象拥有自己的成员对象，它创建了这些成员对象，并且知道它们能存活多久，所以它知道何时调用 <code>dispose()</code> 方法。然而，一旦某个成员对象被其它一个或多个对象共享时，问题就变得复杂了，不能只是简单地调用 <code>dispose()</code>。这里，也许就必须使用<em>引用计数</em>来跟踪仍然访问着共享对象的对象数量，如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/ReferenceCounting.java</span></span>
<span class="line"><span style="color:#6A737D;">// Cleaning up shared member objects</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Shared</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> refcount </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> counter </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> counter</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Shared</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Creating &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">addRef</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        refcount</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">refcount </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Disposing &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Shared &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> id;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Composing</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Shared shared;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> counter </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> counter</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Composing</span><span style="color:#E1E4E8;">(Shared </span><span style="color:#FFAB70;">shared</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Creating &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.shared </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> shared;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.shared.</span><span style="color:#B392F0;">addRef</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;disposing &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        shared.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Composing &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> id;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ReferenceCounting</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Shared shared </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Shared</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">Composing</span><span style="color:#E1E4E8;">[] composing </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Composing</span><span style="color:#E1E4E8;">(shared),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Composing</span><span style="color:#E1E4E8;">(shared),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Composing</span><span style="color:#E1E4E8;">(shared),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Composing</span><span style="color:#E1E4E8;">(shared),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Composing</span><span style="color:#E1E4E8;">(shared),</span></span>
<span class="line"><span style="color:#E1E4E8;">        };</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (Composing c</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> composing) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            c.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/ReferenceCounting.java</span></span>
<span class="line"><span style="color:#6A737D;">// Cleaning up shared member objects</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Shared</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> refcount </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> counter </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> counter</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Shared</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Creating &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">addRef</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        refcount</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">refcount </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Disposing &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Shared &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> id;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Composing</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Shared shared;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> counter </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> counter</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Composing</span><span style="color:#24292E;">(Shared </span><span style="color:#E36209;">shared</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Creating &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.shared </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> shared;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.shared.</span><span style="color:#6F42C1;">addRef</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;disposing &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        shared.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Composing &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> id;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReferenceCounting</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        Shared shared </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Shared</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">Composing</span><span style="color:#24292E;">[] composing </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Composing</span><span style="color:#24292E;">(shared),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Composing</span><span style="color:#24292E;">(shared),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Composing</span><span style="color:#24292E;">(shared),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Composing</span><span style="color:#24292E;">(shared),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Composing</span><span style="color:#24292E;">(shared),</span></span>
<span class="line"><span style="color:#24292E;">        };</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (Composing c</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> composing) {</span></span>
<span class="line"><span style="color:#24292E;">            c.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Creating Shared 0</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating Composing 0</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating Composing 1</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating Composing 2</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating Composing 3</span></span>
<span class="line"><span style="color:#e1e4e8;">Creating Composing 4</span></span>
<span class="line"><span style="color:#e1e4e8;">disposing Composing 0</span></span>
<span class="line"><span style="color:#e1e4e8;">disposing Composing 1</span></span>
<span class="line"><span style="color:#e1e4e8;">disposing Composing 2</span></span>
<span class="line"><span style="color:#e1e4e8;">disposing Composing 3</span></span>
<span class="line"><span style="color:#e1e4e8;">disposing Composing 4</span></span>
<span class="line"><span style="color:#e1e4e8;">Disposing Shared 0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Creating Shared 0</span></span>
<span class="line"><span style="color:#24292e;">Creating Composing 0</span></span>
<span class="line"><span style="color:#24292e;">Creating Composing 1</span></span>
<span class="line"><span style="color:#24292e;">Creating Composing 2</span></span>
<span class="line"><span style="color:#24292e;">Creating Composing 3</span></span>
<span class="line"><span style="color:#24292e;">Creating Composing 4</span></span>
<span class="line"><span style="color:#24292e;">disposing Composing 0</span></span>
<span class="line"><span style="color:#24292e;">disposing Composing 1</span></span>
<span class="line"><span style="color:#24292e;">disposing Composing 2</span></span>
<span class="line"><span style="color:#24292e;">disposing Composing 3</span></span>
<span class="line"><span style="color:#24292e;">disposing Composing 4</span></span>
<span class="line"><span style="color:#24292e;">Disposing Shared 0</span></span></code></pre></div><p><strong>static long counter</strong> 跟踪所创建的 <strong>Shared</strong> 实例数量，还提供了 <strong>id</strong> 的值。<strong>counter</strong> 的类型是 <strong>long</strong> 而不是 <strong>int</strong>，以防溢出（这只是个良好实践，对于本书的所有示例，<strong>counter</strong> 不会溢出）。<strong>id</strong> 是 <strong>final</strong> 的，因为它的值在初始化时确定后不应该变化。</p><p>在将一个 <strong>shared</strong> 对象附着在类上时，必须记住调用 <code>addRef()</code>，而 <code>dispose()</code> 方法会跟踪引用数，以确定在何时真正地执行清理工作。使用这种技巧需要加倍细心，但是如果正在共享需要被清理的对象，就没有太多选择了。</p><h3 id="构造器内部多态方法的行为" tabindex="-1">构造器内部多态方法的行为 <a class="header-anchor" href="#构造器内部多态方法的行为" aria-label="Permalink to &quot;构造器内部多态方法的行为&quot;">​</a></h3><p>构造器调用的层次结构带来了一个困境。如果在构造器中调用了正在构造的对象的动态绑定方法，会发生什么呢？</p><p>在普通的方法中，动态绑定的调用是在运行时解析的，因为对象不知道它属于方法所在的类还是类的派生类。</p><p>如果在构造器中调用了动态绑定方法，就会用到那个方法的重写定义。然而，调用的结果难以预料因为被重写的方法在对象被完全构造出来之前已经被调用，这使得一些 bug 很隐蔽，难以发现。</p><p>从概念上讲，构造器的工作就是创建对象（这并非是平常的工作）。在构造器内部，整个对象可能只是部分形成——只知道基类对象已经初始化。如果构造器只是构造对象过程中的一个步骤，且构造的对象所属的类是从构造器所属的类派生出的，那么派生部分在当前构造器被调用时还没有初始化。然而，一个动态绑定的方法调用向外深入到继承层次结构中，它可以调用派生类的方法。如果你在构造器中这么做，就可能调用一个方法，该方法操纵的成员可能还没有初始化——这肯定会带来灾难。</p><p>下面例子展示了这个问题：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/PolyConstructors.java</span></span>
<span class="line"><span style="color:#6A737D;">// Constructors and polymorphism</span></span>
<span class="line"><span style="color:#6A737D;">// don&#39;t produce what you might expect</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Glyph</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Glyph.draw()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Glyph</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Glyph() before draw()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Glyph() after draw()&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RoundGlyph</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Glyph</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> radius </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">RoundGlyph</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">r</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        radius </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> r;</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;RoundGlyph.RoundGlyph(), radius = &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> radius);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">draw</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;RoundGlyph.draw(), radius = &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> radius);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PolyConstructors</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RoundGlyph</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/PolyConstructors.java</span></span>
<span class="line"><span style="color:#6A737D;">// Constructors and polymorphism</span></span>
<span class="line"><span style="color:#6A737D;">// don&#39;t produce what you might expect</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Glyph</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Glyph.draw()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Glyph</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Glyph() before draw()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Glyph() after draw()&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RoundGlyph</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Glyph</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> radius </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">RoundGlyph</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">r</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        radius </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> r;</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;RoundGlyph.RoundGlyph(), radius = &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> radius);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">draw</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;RoundGlyph.draw(), radius = &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> radius);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PolyConstructors</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RoundGlyph</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Glyph() before draw()</span></span>
<span class="line"><span style="color:#e1e4e8;">RoundGlyph.draw(), radius = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">Glyph() after draw()</span></span>
<span class="line"><span style="color:#e1e4e8;">RoundGlyph.RoundGlyph(), radius = 5</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Glyph() before draw()</span></span>
<span class="line"><span style="color:#24292e;">RoundGlyph.draw(), radius = 0</span></span>
<span class="line"><span style="color:#24292e;">Glyph() after draw()</span></span>
<span class="line"><span style="color:#24292e;">RoundGlyph.RoundGlyph(), radius = 5</span></span></code></pre></div><p><strong>Glyph</strong> 的 <code>draw()</code> 被设计为可重写，在 <strong>RoundGlyph</strong> 这个方法被重写。但是 <strong>Glyph</strong> 的构造器里调用了这个方法，结果调用了 <strong>RoundGlyph</strong> 的 <code>draw()</code> 方法，这看起来正是我们的目的。输出结果表明，当 <strong>Glyph</strong> 构造器调用了 <code>draw()</code> 时，<strong>radius</strong> 的值不是默认初始值 1 而是 0。这可能会导致在屏幕上只画了一个点或干脆什么都不画，于是我们只能干瞪眼，试图找到程序不工作的原因。</p><p>前一小节描述的初始化顺序并不十分完整，而这正是解决谜团的关键所在。初始化的实际过程是：</p><ol><li>在所有事发生前，分配给对象的存储空间会被初始化为二进制 0。</li><li>如前所述调用基类构造器。此时调用重写后的 <code>draw()</code> 方法（是的，在调用 <strong>RoundGraph</strong> 构造器之前调用），由步骤 1 可知，<strong>radius</strong> 的值为 0。</li><li>按声明顺序初始化成员。</li><li>最终调用派生类的构造器。</li></ol><p>这么做有个优点：所有事物至少初始化为 0（或某些特殊数据类型与 0 等价的值），而不是仅仅留作垃圾。这包括了通过组合嵌入类中的对象引用，被赋予 <strong>null</strong>。如果忘记初始化该引用，就会在运行时出现异常。观察输出结果，就会发现所有事物都是 0。</p><p>另一方面，应该震惊于输出结果。逻辑方面我们已经做得非常完美，然而行为仍不可思议的错了，编译器也没有报错（C++ 在这种情况下会产生更加合理的行为）。像这样的 bug 很容易被忽略，需要花很长时间才能发现。</p><p>因此，编写构造器有一条良好规范：做尽量少的事让对象进入良好状态。如果有可能的话，尽量不要调用类中的任何方法。在基类的构造器中能安全调用的只有基类的 <strong>final</strong> 方法（这也适用于可被看作是 <strong>final</strong> 的 <strong>private</strong> 方法）。这些方法不能被重写，因此不会产生意想不到的结果。你可能无法永远遵循这条规范，但应该朝着它努力。</p><h2 id="协变返回类型" tabindex="-1">协变返回类型 <a class="header-anchor" href="#协变返回类型" aria-label="Permalink to &quot;协变返回类型&quot;">​</a></h2><p>Java 5 中引入了协变返回类型，这表示派生类的被重写方法可以返回基类方法返回类型的派生类型：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/CovariantReturn.java</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Grain</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Grain&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Wheat</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Grain</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Wheat&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Mill</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Grain </span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Grain</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WheatMill</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Mill</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    Wheat </span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Wheat</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CovariantReturn</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Mill m </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Mill</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Grain g </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> m.</span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(g);</span></span>
<span class="line"><span style="color:#E1E4E8;">        m </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WheatMill</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        g </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> m.</span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(g);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/CovariantReturn.java</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Grain</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Grain&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Wheat</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Grain</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Wheat&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Mill</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    Grain </span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Grain</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WheatMill</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Mill</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    Wheat </span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Wheat</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CovariantReturn</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        Mill m </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Mill</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        Grain g </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> m.</span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(g);</span></span>
<span class="line"><span style="color:#24292E;">        m </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WheatMill</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        g </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> m.</span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(g);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Grain</span></span>
<span class="line"><span style="color:#e1e4e8;">Wheat</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Grain</span></span>
<span class="line"><span style="color:#24292e;">Wheat</span></span></code></pre></div><p>关键区别在于 Java 5 之前的版本强制要求被重写的 <code>process()</code> 方法必须返回 <strong>Grain</strong> 而不是 <strong>Wheat</strong>，即使 <strong>Wheat</strong> 派生自 <strong>Grain</strong>，因而也应该是一种合法的返回类型。协变返回类型允许返回更具体的 <strong>Wheat</strong> 类型。</p><h2 id="使用继承设计" tabindex="-1">使用继承设计 <a class="header-anchor" href="#使用继承设计" aria-label="Permalink to &quot;使用继承设计&quot;">​</a></h2><p>学习过多态之后，一切看似都可以被继承，因为多态是如此巧妙的工具。这会给设计带来负担。事实上，如果利用已有类创建新类首先选择继承的话，事情会变得莫名的复杂。</p><p>更好的方法是首先选择组合，特别是不知道该使用哪种方法时。组合不会强制设计是继承层次结构，而且组合更加灵活，因为可以动态地选择类型（因而选择相应的行为），而继承要求必须在编译时知道确切类型。下面例子说明了这点：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/Transmogrify.java</span></span>
<span class="line"><span style="color:#6A737D;">// Dynamically changing the behavior of an object</span></span>
<span class="line"><span style="color:#6A737D;">// via composition (the &quot;State&quot; design pattern)</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Actor</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">act</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HappyActor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Actor</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">act</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;HappyActor&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SadActor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Actor</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">act</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;SadActor&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Stage</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Actor actor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HappyActor</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">change</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        actor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SadActor</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">performPlay</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        actor.</span><span style="color:#B392F0;">act</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Transmogrify</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Stage stage </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Stage</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage.</span><span style="color:#B392F0;">performPlay</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage.</span><span style="color:#B392F0;">change</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage.</span><span style="color:#B392F0;">performPlay</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/Transmogrify.java</span></span>
<span class="line"><span style="color:#6A737D;">// Dynamically changing the behavior of an object</span></span>
<span class="line"><span style="color:#6A737D;">// via composition (the &quot;State&quot; design pattern)</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Actor</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">act</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HappyActor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Actor</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">act</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;HappyActor&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SadActor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Actor</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">act</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;SadActor&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Stage</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Actor actor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HappyActor</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">change</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        actor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SadActor</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">performPlay</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        actor.</span><span style="color:#6F42C1;">act</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Transmogrify</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        Stage stage </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Stage</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        stage.</span><span style="color:#6F42C1;">performPlay</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        stage.</span><span style="color:#6F42C1;">change</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        stage.</span><span style="color:#6F42C1;">performPlay</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">HappyActor</span></span>
<span class="line"><span style="color:#e1e4e8;">SadActor</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">HappyActor</span></span>
<span class="line"><span style="color:#24292e;">SadActor</span></span></code></pre></div><p><strong>Stage</strong> 对象中包含了 <strong>Actor</strong> 引用，该引用被初始化为指向一个 <strong>HappyActor</strong> 对象，这意味着 <code>performPlay()</code> 会产生一个特殊行为。但是既然引用可以在运行时与其他不同的对象绑定，那么它就可以被替换成对 <strong>SadActor</strong> 的引用，<code>performPlay()</code> 的行为随之改变。这样你就获得了运行时的动态灵活性（这被称为状态模式）。与之相反，我们不能在运行时决定继承不同的对象，那在编译时就完全确定下来了。</p><p>有一条通用准则：使用继承表达行为的差异，使用属性表达状态的变化。在上个例子中，两者都用到了。通过继承得到的两个不同类在 <code>act()</code> 方法中表达了不同的行为，<strong>Stage</strong> 通过组合使自己的状态发生变化。这里状态的改变产生了行为的改变。</p><h3 id="替代-vs-扩展" tabindex="-1">替代 vs 扩展 <a class="header-anchor" href="#替代-vs-扩展" aria-label="Permalink to &quot;替代 vs 扩展&quot;">​</a></h3><p>采用“纯粹”的方式创建继承层次结构看上去是最清晰的方法。即只有基类的方法才能在派生类中被重写，就像下图这样：</p><p><img src="`+e+'" alt="类图"></p><p>这被称作纯粹的“is - a&quot;关系，因为类的接口已经确定了它是什么。继承可以确保任何派生类都拥有基类的接口，绝对不会少。如果按图上这么做，派生类将只拥有基类的接口。</p><p>纯粹的替代意味着派生类可以完美地替代基类，当使用它们时，完全不需要知道这些子类的信息。也就是说，基类可以接收任意发送给派生类的消息，因为它们具有完全相同的接口。只需将派生类向上转型，不要关注对象的具体类型。所有一切都可以通过多态处理。</p><p>按这种方式思考，似乎只有纯粹的“is - a”关系才是唯一明智的做法，其他任何设计只会导致混乱且注定失败。这其实也是个陷阱。一旦按这种方式开始思考，就会转而发现继承扩展接口（遗憾的是，extends 关键字似乎怂恿我们这么做）才是解决特定问题的完美方案。这可以称为“is - like - a” 关系，因为派生类就像是基类——它有着相同的基本接口，但还具有需要额外方法实现的其他特性：</p><p><img src="'+c+'" alt=""></p><p>虽然这是一种有用且明智的方法（依赖具体情况），但是也存在缺点。派生类中接口的扩展部分在基类中不存在（不能通过基类访问到这些扩展接口），因此一旦向上转型，就不能通过基类调用这些新方法：</p><p><img src="'+t+`" alt=""></p><p>如果不向上转型，就不会遇到这个问题。但是通常情况下，我们需要重新查明对象的确切类型，从而能够访问该类型中的扩展方法。下一节说明如何做到这点。</p><h3 id="向下转型与运行时类型信息" tabindex="-1">向下转型与运行时类型信息 <a class="header-anchor" href="#向下转型与运行时类型信息" aria-label="Permalink to &quot;向下转型与运行时类型信息&quot;">​</a></h3><p>由于向上转型（在继承层次中向上移动）会丢失具体的类型信息，那么为了重新获取类型信息，就需要在继承层次中向下移动，使用<em>向下转型</em>。</p><p>向上转型永远是安全的，因为基类不会具有比派生类更多的接口。因此，每条发送给基类接口的消息都能被接收。但是对于向下转型，你无法知道一个形状是圆，它有可能是三角形、正方形或其他一些类型。</p><p>为了解决这个问题，必须得有某种方法确保向下转型是正确的，防止意外转型到一个错误类型，进而发送对象无法接收的消息。这么做是不安全的。</p><p>在某些语言中（如 C++），必须执行一个特殊的操作来获得安全的向下转型，但是在 Java 中，每次转型都会被检查！所以即使只是进行一次普通的加括号形式的类型转换，在运行时这个转换仍会被检查，以确保它的确是希望的那种类型。如果不是，就会得到 ClassCastException （类转型异常）。这种在运行时检查类型的行为称作运行时类型信息。下面例子展示了 RTTI 的行为：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// polymorphism/RTTI.java</span></span>
<span class="line"><span style="color:#6A737D;">// Downcasting &amp; Runtime type information (RTTI)</span></span>
<span class="line"><span style="color:#6A737D;">// {ThrowsException}</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Useful</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">g</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MoreUseful</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Useful</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">f</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">g</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">u</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">w</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RTTI</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">Useful</span><span style="color:#E1E4E8;">[] x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Useful</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MoreUseful</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        };</span></span>
<span class="line"><span style="color:#E1E4E8;">        x[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">].</span><span style="color:#B392F0;">f</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        x[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">].</span><span style="color:#B392F0;">g</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Compile time: method not found in Useful:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//- x[1].u();</span></span>
<span class="line"><span style="color:#E1E4E8;">        ((MoreUseful) x[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]).</span><span style="color:#B392F0;">u</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// Downcast/RTTI</span></span>
<span class="line"><span style="color:#E1E4E8;">        ((MoreUseful) x[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]).</span><span style="color:#B392F0;">u</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// Exception thrown</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// polymorphism/RTTI.java</span></span>
<span class="line"><span style="color:#6A737D;">// Downcasting &amp; Runtime type information (RTTI)</span></span>
<span class="line"><span style="color:#6A737D;">// {ThrowsException}</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Useful</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">g</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MoreUseful</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Useful</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">g</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">u</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">w</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RTTI</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">Useful</span><span style="color:#24292E;">[] x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Useful</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MoreUseful</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        };</span></span>
<span class="line"><span style="color:#24292E;">        x[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">].</span><span style="color:#6F42C1;">f</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        x[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">].</span><span style="color:#6F42C1;">g</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Compile time: method not found in Useful:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//- x[1].u();</span></span>
<span class="line"><span style="color:#24292E;">        ((MoreUseful) x[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]).</span><span style="color:#6F42C1;">u</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// Downcast/RTTI</span></span>
<span class="line"><span style="color:#24292E;">        ((MoreUseful) x[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]).</span><span style="color:#6F42C1;">u</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// Exception thrown</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>输出：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Exception in thread &quot;main&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">java.lang.ClassCastException: Useful cannot be cast to</span></span>
<span class="line"><span style="color:#e1e4e8;">MoreUseful</span></span>
<span class="line"><span style="color:#e1e4e8;">at RTTI.main</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Exception in thread &quot;main&quot;</span></span>
<span class="line"><span style="color:#24292e;">java.lang.ClassCastException: Useful cannot be cast to</span></span>
<span class="line"><span style="color:#24292e;">MoreUseful</span></span>
<span class="line"><span style="color:#24292e;">at RTTI.main</span></span></code></pre></div><p>正如前面类图所示，<strong>MoreUseful</strong> 扩展了 <strong>Useful</strong> 的接口。而 <strong>MoreUseful</strong> 也继承了 <strong>Useful</strong>，所以它可以向上转型为 <strong>Useful</strong>。在 <code>main()</code> 方法中可以看到这种情况的发生。因为两个对象都是 <strong>Useful</strong> 类型，所以对它们都可以调用 <code>f()</code> 和 <code>g()</code> 方法。如果试图调用 <code>u()</code> 方法（只存在于 <strong>MoreUseful</strong> 中），就会得到编译时错误信息。</p><p>为了访问 <strong>MoreUseful</strong> 对象的扩展接口，就得尝试向下转型。如果转型为正确的类型，就转型成功。否则，就会得到 ClassCastException 异常。你不必为这个异常编写任何特殊代码，因为它指出了程序员在程序的任何地方都可能犯的错误。<strong>{ThrowsException}</strong> 注释标签告知本书的构建系统：在运行程序时，预期抛出一个异常。</p><p>RTTI 不仅仅包括简单的转型。例如，它还提供了一种方法，使你可以在试图向下转型前检查所要处理的类型。“类型信息”一章中会详细阐述运行时类型信息的方方面面。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><p>多态意味着“不同的形式”。在面向对象编程中，我们持有从基类继承而来的相同接口和使用该接口的不同形式：不同版本的动态绑定方法。</p><p>在本章中，你可以看到，如果不使用数据抽象和继承，就不可能理解甚至创建多态的例子。多态是一种不能单独看待的特性（比如像 <strong>switch</strong> 语句那样），它只能作为类关系全景中的一部分，与其他特性协同工作。</p><p>为了在程序中有效地使用多态乃至面向对象的技术，就必须扩展自己的编程视野，不能只看到单一类中的成员和消息，而要看到类之间的共同特性和它们之间的关系。尽管这需要很大的努力，但是这么做是值得的。它能带来更快的程序开发、更好的代码组织、扩展性更好的程序和更易维护的代码。</p><p>但是记住，多态可能被滥用。仔细分析代码以确保多态确实能带来好处。</p>`,177),y=[E];function i(F,d,u,g,h,D){return n(),a("div",null,y)}const m=s(r,[["render",i]]);export{C as __pageData,m as default};
