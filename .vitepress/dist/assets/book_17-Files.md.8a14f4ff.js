import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.c3fbb961.js";const D=JSON.parse('{"title":"第十七章 文件","description":"","frontmatter":{},"headers":[],"relativePath":"book/17-Files.md","filePath":"book/17-Files.md"}'),p={name:"book/17-Files.md"},o=l(`<p>[TOC]</p><h1 id="第十七章-文件" tabindex="-1">第十七章 文件 <a class="header-anchor" href="#第十七章-文件" aria-label="Permalink to &quot;第十七章 文件&quot;">​</a></h1><blockquote><p>在丑陋的 Java I/O 编程方式诞生多年以后，Java终于简化了文件读写的基本操作。</p></blockquote><p>这种&quot;困难方式&quot;的全部细节都在 <a href="./Appendix-IO-Streams.html">Appendix: I/O Streams</a>。如果你读过这个部分，就会认同 Java 设计者毫不在意他们的使用者的体验这一观念。打开并读取文件对于大多数编程语言来是非常常用的，由于 I/O 糟糕的设计以至于 很少有人能够在不依赖其他参考代码的情况下完成打开文件的操作。</p><p>好像 Java 设计者终于意识到了 Java 使用者多年来的痛苦，在 Java7 中对此引入了巨大的改进。这些新元素被放在 <strong>java.nio.file</strong> 包下面，过去人们通常把 <strong>nio</strong> 中的 <strong>n</strong> 理解为 <strong>new</strong> 即新的 <strong>io</strong>，现在更应该当成是 <strong>non-blocking</strong> 非阻塞 <strong>io</strong>(<strong>io</strong>就是<em>input/output输入/输出</em>)。<strong>java.nio.file</strong> 库终于将 Java 文件操作带到与其他编程语言相同的水平。最重要的是 Java8 新增的 streams 与文件结合使得文件操作编程变得更加优雅。我们将看一下文件操作的两个基本组件：</p><ol><li>文件或者目录的路径；</li><li>文件本身。</li></ol><h2 id="文件和目录路径" tabindex="-1">文件和目录路径 <a class="header-anchor" href="#文件和目录路径" aria-label="Permalink to &quot;文件和目录路径&quot;">​</a></h2><p>一个 <strong>Path</strong> 对象表示一个文件或者目录的路径，是一个跨操作系统（OS）和文件系统的抽象，目的是在构造路径时不必关注底层操作系统，代码可以在不进行修改的情况下运行在不同的操作系统上。<strong>java.nio.file.Paths</strong> 类包含一个重载方法 <strong>static get()</strong>，该方法接受一系列 <strong>String</strong> 字符串或一个<em>统一资源标识符</em>(URI)作为参数，并且进行转换返回一个 <strong>Path</strong> 对象：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// files/PathInfo.java</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.net.URI;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.io.File;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.io.IOException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PathInfo</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">, Object </span><span style="color:#FFAB70;">p</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(id </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> p);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(Path </span><span style="color:#FFAB70;">p</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;toString&quot;</span><span style="color:#E1E4E8;">, p);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Exists&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">exists</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;RegularFile&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">isRegularFile</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Directory&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">isDirectory</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Absolute&quot;</span><span style="color:#E1E4E8;">, p.</span><span style="color:#B392F0;">isAbsolute</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;FileName&quot;</span><span style="color:#E1E4E8;">, p.</span><span style="color:#B392F0;">getFileName</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Parent&quot;</span><span style="color:#E1E4E8;">, p.</span><span style="color:#B392F0;">getParent</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Root&quot;</span><span style="color:#E1E4E8;">, p.</span><span style="color:#B392F0;">getRoot</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;******************&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(System.</span><span style="color:#B392F0;">getProperty</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;os.name&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;C:&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;path&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;to&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;nowhere&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;NoFile.txt&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        Path p </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;PathInfo.java&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(p);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Path ap </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> p.</span><span style="color:#B392F0;">toAbsolutePath</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(ap);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(ap.</span><span style="color:#B392F0;">getParent</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(p.</span><span style="color:#B392F0;">toRealPath</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;">(IOException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">           System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        URI u </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> p.</span><span style="color:#B392F0;">toUri</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;URI: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> u);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Path puri </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(u);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(Files.</span><span style="color:#B392F0;">exists</span><span style="color:#E1E4E8;">(puri));</span></span>
<span class="line"><span style="color:#E1E4E8;">        File f </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ap.</span><span style="color:#B392F0;">toFile</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// Don&#39;t be fooled</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 输出:</span></span>
<span class="line"><span style="color:#6A737D;">Windows 10</span></span>
<span class="line"><span style="color:#6A737D;">toString: C:\\path\\to\\nowhere\\NoFile.txt</span></span>
<span class="line"><span style="color:#6A737D;">Exists: false</span></span>
<span class="line"><span style="color:#6A737D;">RegularFile: false</span></span>
<span class="line"><span style="color:#6A737D;">Directory: false</span></span>
<span class="line"><span style="color:#6A737D;">Absolute: true</span></span>
<span class="line"><span style="color:#6A737D;">FileName: NoFile.txt</span></span>
<span class="line"><span style="color:#6A737D;">Parent: C:\\path\\to\\nowhere</span></span>
<span class="line"><span style="color:#6A737D;">Root: C:\\</span></span>
<span class="line"><span style="color:#6A737D;">******************</span></span>
<span class="line"><span style="color:#6A737D;">toString: PathInfo.java</span></span>
<span class="line"><span style="color:#6A737D;">Exists: true</span></span>
<span class="line"><span style="color:#6A737D;">RegularFile: true</span></span>
<span class="line"><span style="color:#6A737D;">Directory: false</span></span>
<span class="line"><span style="color:#6A737D;">Absolute: false</span></span>
<span class="line"><span style="color:#6A737D;">FileName: PathInfo.java</span></span>
<span class="line"><span style="color:#6A737D;">Parent: null</span></span>
<span class="line"><span style="color:#6A737D;">Root: null</span></span>
<span class="line"><span style="color:#6A737D;">******************</span></span>
<span class="line"><span style="color:#6A737D;">toString: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files\\PathInfo.java</span></span>
<span class="line"><span style="color:#6A737D;">Exists: true</span></span>
<span class="line"><span style="color:#6A737D;">RegularFile: true</span></span>
<span class="line"><span style="color:#6A737D;">Directory: false</span></span>
<span class="line"><span style="color:#6A737D;">Absolute: true</span></span>
<span class="line"><span style="color:#6A737D;">FileName: PathInfo.java</span></span>
<span class="line"><span style="color:#6A737D;">Parent: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">Root: C:\\</span></span>
<span class="line"><span style="color:#6A737D;">******************</span></span>
<span class="line"><span style="color:#6A737D;">toString: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">Exists: true</span></span>
<span class="line"><span style="color:#6A737D;">RegularFile: false</span></span>
<span class="line"><span style="color:#6A737D;">Directory: true</span></span>
<span class="line"><span style="color:#6A737D;">Absolute: true</span></span>
<span class="line"><span style="color:#6A737D;">FileName: files</span></span>
<span class="line"><span style="color:#6A737D;">Parent: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples</span></span>
<span class="line"><span style="color:#6A737D;">Root: C:\\</span></span>
<span class="line"><span style="color:#6A737D;">******************</span></span>
<span class="line"><span style="color:#6A737D;">toString: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files\\PathInfo.java</span></span>
<span class="line"><span style="color:#6A737D;">Exists: true</span></span>
<span class="line"><span style="color:#6A737D;">RegularFile: true</span></span>
<span class="line"><span style="color:#6A737D;">Directory: false</span></span>
<span class="line"><span style="color:#6A737D;">Absolute: true</span></span>
<span class="line"><span style="color:#6A737D;">FileName: PathInfo.java</span></span>
<span class="line"><span style="color:#6A737D;">Parent: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">Root: C:\\</span></span>
<span class="line"><span style="color:#6A737D;">******************</span></span>
<span class="line"><span style="color:#6A737D;">URI: file:///C:/Users/Bruce/Documents/GitHub/onjava/</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples/files/PathInfo.java</span></span>
<span class="line"><span style="color:#6A737D;">true</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// files/PathInfo.java</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.net.URI;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.io.File;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.io.IOException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PathInfo</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">id</span><span style="color:#24292E;">, Object </span><span style="color:#E36209;">p</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(id </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> p);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(Path </span><span style="color:#E36209;">p</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;toString&quot;</span><span style="color:#24292E;">, p);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Exists&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">exists</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;RegularFile&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">isRegularFile</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Directory&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">isDirectory</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Absolute&quot;</span><span style="color:#24292E;">, p.</span><span style="color:#6F42C1;">isAbsolute</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;FileName&quot;</span><span style="color:#24292E;">, p.</span><span style="color:#6F42C1;">getFileName</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Parent&quot;</span><span style="color:#24292E;">, p.</span><span style="color:#6F42C1;">getParent</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Root&quot;</span><span style="color:#24292E;">, p.</span><span style="color:#6F42C1;">getRoot</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;******************&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(System.</span><span style="color:#6F42C1;">getProperty</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;os.name&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;C:&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;path&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;to&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;nowhere&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;NoFile.txt&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        Path p </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;PathInfo.java&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(p);</span></span>
<span class="line"><span style="color:#24292E;">        Path ap </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> p.</span><span style="color:#6F42C1;">toAbsolutePath</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(ap);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(ap.</span><span style="color:#6F42C1;">getParent</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(p.</span><span style="color:#6F42C1;">toRealPath</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;">(IOException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">           System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        URI u </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> p.</span><span style="color:#6F42C1;">toUri</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;URI: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> u);</span></span>
<span class="line"><span style="color:#24292E;">        Path puri </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(u);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(Files.</span><span style="color:#6F42C1;">exists</span><span style="color:#24292E;">(puri));</span></span>
<span class="line"><span style="color:#24292E;">        File f </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ap.</span><span style="color:#6F42C1;">toFile</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// Don&#39;t be fooled</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 输出:</span></span>
<span class="line"><span style="color:#6A737D;">Windows 10</span></span>
<span class="line"><span style="color:#6A737D;">toString: C:\\path\\to\\nowhere\\NoFile.txt</span></span>
<span class="line"><span style="color:#6A737D;">Exists: false</span></span>
<span class="line"><span style="color:#6A737D;">RegularFile: false</span></span>
<span class="line"><span style="color:#6A737D;">Directory: false</span></span>
<span class="line"><span style="color:#6A737D;">Absolute: true</span></span>
<span class="line"><span style="color:#6A737D;">FileName: NoFile.txt</span></span>
<span class="line"><span style="color:#6A737D;">Parent: C:\\path\\to\\nowhere</span></span>
<span class="line"><span style="color:#6A737D;">Root: C:\\</span></span>
<span class="line"><span style="color:#6A737D;">******************</span></span>
<span class="line"><span style="color:#6A737D;">toString: PathInfo.java</span></span>
<span class="line"><span style="color:#6A737D;">Exists: true</span></span>
<span class="line"><span style="color:#6A737D;">RegularFile: true</span></span>
<span class="line"><span style="color:#6A737D;">Directory: false</span></span>
<span class="line"><span style="color:#6A737D;">Absolute: false</span></span>
<span class="line"><span style="color:#6A737D;">FileName: PathInfo.java</span></span>
<span class="line"><span style="color:#6A737D;">Parent: null</span></span>
<span class="line"><span style="color:#6A737D;">Root: null</span></span>
<span class="line"><span style="color:#6A737D;">******************</span></span>
<span class="line"><span style="color:#6A737D;">toString: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files\\PathInfo.java</span></span>
<span class="line"><span style="color:#6A737D;">Exists: true</span></span>
<span class="line"><span style="color:#6A737D;">RegularFile: true</span></span>
<span class="line"><span style="color:#6A737D;">Directory: false</span></span>
<span class="line"><span style="color:#6A737D;">Absolute: true</span></span>
<span class="line"><span style="color:#6A737D;">FileName: PathInfo.java</span></span>
<span class="line"><span style="color:#6A737D;">Parent: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">Root: C:\\</span></span>
<span class="line"><span style="color:#6A737D;">******************</span></span>
<span class="line"><span style="color:#6A737D;">toString: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">Exists: true</span></span>
<span class="line"><span style="color:#6A737D;">RegularFile: false</span></span>
<span class="line"><span style="color:#6A737D;">Directory: true</span></span>
<span class="line"><span style="color:#6A737D;">Absolute: true</span></span>
<span class="line"><span style="color:#6A737D;">FileName: files</span></span>
<span class="line"><span style="color:#6A737D;">Parent: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples</span></span>
<span class="line"><span style="color:#6A737D;">Root: C:\\</span></span>
<span class="line"><span style="color:#6A737D;">******************</span></span>
<span class="line"><span style="color:#6A737D;">toString: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files\\PathInfo.java</span></span>
<span class="line"><span style="color:#6A737D;">Exists: true</span></span>
<span class="line"><span style="color:#6A737D;">RegularFile: true</span></span>
<span class="line"><span style="color:#6A737D;">Directory: false</span></span>
<span class="line"><span style="color:#6A737D;">Absolute: true</span></span>
<span class="line"><span style="color:#6A737D;">FileName: PathInfo.java</span></span>
<span class="line"><span style="color:#6A737D;">Parent: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">Root: C:\\</span></span>
<span class="line"><span style="color:#6A737D;">******************</span></span>
<span class="line"><span style="color:#6A737D;">URI: file:///C:/Users/Bruce/Documents/GitHub/onjava/</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples/files/PathInfo.java</span></span>
<span class="line"><span style="color:#6A737D;">true</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><p>我已经在这一章第一个程序的 <strong>main()</strong> 方法添加了第一行用于展示操作系统的名称，因此你可以看到不同操作系统之间存在哪些差异。理想情况下，差别会相对较小，并且使用 <strong>/</strong> 或者 <strong>\\</strong> 路径分隔符进行分隔。你可以看到我运行在Windows 10 上的程序输出。</p><p>当 <strong>toString()</strong> 方法生成完整形式的路径，你可以看到 <strong>getFileName()</strong> 方法总是返回当前文件名。 通过使用 <strong>Files</strong> 工具类(我们接下类将会更多地使用它)，可以测试一个文件是否存在，测试是否是一个&quot;普通&quot;文件还是一个目录等等。&quot;Nofile.txt&quot;这个示例展示我们描述的文件可能并不在指定的位置；这样可以允许你创建一个新的路径。&quot;PathInfo.java&quot;存在于当前目录中，最初它只是没有路径的文件名，但它仍然被检测为&quot;存在&quot;。一旦我们将其转换为绝对路径，我们将会得到一个从&quot;C:&quot;盘(因为我们是在Windows机器下进行测试)开始的完整路径，现在它也拥有一个父路径。“真实”路径的定义在文档中有点模糊，因为它取决于具体的文件系统。例如，如果文件名不区分大小写，即使路径由于大小写的缘故而不是完全相同，也可能得到肯定的匹配结果。在这样的平台上，<strong>toRealPath()</strong> 将返回实际情况下的 <strong>Path</strong>，并且还会删除任何冗余元素。</p><p>这里你会看到 <strong>URI</strong> 看起来只能用于描述文件，实际上 <strong>URI</strong> 可以用于描述更多的东西；通过 <a href="https://en.wikipedia.org/wiki/Uniform_Resource_Identifier" target="_blank" rel="noreferrer">维基百科</a> 可以了解更多细节。现在我们成功地将 <strong>URI</strong> 转为一个 <strong>Path</strong> 对象。</p><p>最后，你会在 <strong>Path</strong> 中看到一些有点欺骗的东西，这就是调用 <strong>toFile()</strong> 方法会生成一个 <strong>File</strong> 对象。听起来似乎可以得到一个类似文件的东西(毕竟被称为 <strong>File</strong> )，但是这个方法的存在仅仅是为了向后兼容。虽然看上去应该被称为&quot;路径&quot;，实际上却应该表示目录或者文件本身。这是个非常草率并且令人困惑的命名，但是由于 <strong>java.nio.file</strong> 的存在我们可以安全地忽略它的存在。</p><h3 id="选取路径部分片段" tabindex="-1">选取路径部分片段 <a class="header-anchor" href="#选取路径部分片段" aria-label="Permalink to &quot;选取路径部分片段&quot;">​</a></h3><p><strong>Path</strong> 对象可以非常容易地生成路径的某一部分：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// files/PartsOfPaths.java</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PartsOfPaths</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(System.</span><span style="color:#B392F0;">getProperty</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;os.name&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        Path p </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;PartsOfPaths.java&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toAbsolutePath</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> p.</span><span style="color:#B392F0;">getNameCount</span><span style="color:#E1E4E8;">(); i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(p.</span><span style="color:#B392F0;">getName</span><span style="color:#E1E4E8;">(i));</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;ends with &#39;.java&#39;: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">        p.</span><span style="color:#B392F0;">endsWith</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;.java&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(Path pp </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> p) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(pp </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;: &quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(p.</span><span style="color:#B392F0;">startsWith</span><span style="color:#E1E4E8;">(pp) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot; : &quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(p.</span><span style="color:#B392F0;">endsWith</span><span style="color:#E1E4E8;">(pp));</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Starts with &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> p.</span><span style="color:#B392F0;">getRoot</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot; &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> p.</span><span style="color:#B392F0;">startsWith</span><span style="color:#E1E4E8;">(p.</span><span style="color:#B392F0;">getRoot</span><span style="color:#E1E4E8;">()));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 输出:</span></span>
<span class="line"><span style="color:#6A737D;">Windows 10</span></span>
<span class="line"><span style="color:#6A737D;">Users</span></span>
<span class="line"><span style="color:#6A737D;">Bruce</span></span>
<span class="line"><span style="color:#6A737D;">Documents</span></span>
<span class="line"><span style="color:#6A737D;">GitHub</span></span>
<span class="line"><span style="color:#6A737D;">on-java</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples</span></span>
<span class="line"><span style="color:#6A737D;">files</span></span>
<span class="line"><span style="color:#6A737D;">PartsOfPaths.java</span></span>
<span class="line"><span style="color:#6A737D;">ends with &#39;.java&#39;: false</span></span>
<span class="line"><span style="color:#6A737D;">Users: false : false</span></span>
<span class="line"><span style="color:#6A737D;">Bruce: false : false</span></span>
<span class="line"><span style="color:#6A737D;">Documents: false : false</span></span>
<span class="line"><span style="color:#6A737D;">GitHub: false : false</span></span>
<span class="line"><span style="color:#6A737D;">on-java: false : false</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples: false : false</span></span>
<span class="line"><span style="color:#6A737D;">files: false : false</span></span>
<span class="line"><span style="color:#6A737D;">PartsOfPaths.java: false : true</span></span>
<span class="line"><span style="color:#6A737D;">Starts with C:\\ true</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// files/PartsOfPaths.java</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PartsOfPaths</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(System.</span><span style="color:#6F42C1;">getProperty</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;os.name&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        Path p </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;PartsOfPaths.java&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toAbsolutePath</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> p.</span><span style="color:#6F42C1;">getNameCount</span><span style="color:#24292E;">(); i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(p.</span><span style="color:#6F42C1;">getName</span><span style="color:#24292E;">(i));</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ends with &#39;.java&#39;: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">        p.</span><span style="color:#6F42C1;">endsWith</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;.java&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;">(Path pp </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> p) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(pp </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;: &quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(p.</span><span style="color:#6F42C1;">startsWith</span><span style="color:#24292E;">(pp) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot; : &quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(p.</span><span style="color:#6F42C1;">endsWith</span><span style="color:#24292E;">(pp));</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Starts with &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> p.</span><span style="color:#6F42C1;">getRoot</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot; &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> p.</span><span style="color:#6F42C1;">startsWith</span><span style="color:#24292E;">(p.</span><span style="color:#6F42C1;">getRoot</span><span style="color:#24292E;">()));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 输出:</span></span>
<span class="line"><span style="color:#6A737D;">Windows 10</span></span>
<span class="line"><span style="color:#6A737D;">Users</span></span>
<span class="line"><span style="color:#6A737D;">Bruce</span></span>
<span class="line"><span style="color:#6A737D;">Documents</span></span>
<span class="line"><span style="color:#6A737D;">GitHub</span></span>
<span class="line"><span style="color:#6A737D;">on-java</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples</span></span>
<span class="line"><span style="color:#6A737D;">files</span></span>
<span class="line"><span style="color:#6A737D;">PartsOfPaths.java</span></span>
<span class="line"><span style="color:#6A737D;">ends with &#39;.java&#39;: false</span></span>
<span class="line"><span style="color:#6A737D;">Users: false : false</span></span>
<span class="line"><span style="color:#6A737D;">Bruce: false : false</span></span>
<span class="line"><span style="color:#6A737D;">Documents: false : false</span></span>
<span class="line"><span style="color:#6A737D;">GitHub: false : false</span></span>
<span class="line"><span style="color:#6A737D;">on-java: false : false</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples: false : false</span></span>
<span class="line"><span style="color:#6A737D;">files: false : false</span></span>
<span class="line"><span style="color:#6A737D;">PartsOfPaths.java: false : true</span></span>
<span class="line"><span style="color:#6A737D;">Starts with C:\\ true</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><p>可以通过 <strong>getName()</strong> 来索引 <strong>Path</strong> 的各个部分，直到达到上限 <strong>getNameCount()</strong>。<strong>Path</strong> 也实现了 <strong>Iterable</strong> 接口，因此我们也可以通过增强的 for-each 进行遍历。请注意，即使路径以 <strong>.java</strong> 结尾，使用 <strong>endsWith()</strong> 方法也会返回 <strong>false</strong>。这是因为使用 <strong>endsWith()</strong> 比较的是整个路径部分，而不会包含文件路径的后缀。通过使用 <strong>startsWith()</strong> 和 <strong>endsWith()</strong> 也可以完成路径的遍历。但是我们可以看到，遍历 <strong>Path</strong> 对象并不包含根路径，只有使用 <strong>startsWith()</strong> 检测根路径时才会返回 <strong>true</strong>。</p><h3 id="路径分析" tabindex="-1">路径分析 <a class="header-anchor" href="#路径分析" aria-label="Permalink to &quot;路径分析&quot;">​</a></h3><p><strong>Files</strong> 工具类包含一系列完整的方法用于获得 <strong>Path</strong> 相关的信息。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// files/PathAnalysis.java</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.io.IOException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PathAnalysis</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">, Object </span><span style="color:#FFAB70;">result</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(id </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;: &quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(result);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(System.</span><span style="color:#B392F0;">getProperty</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;os.name&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        Path p </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;PathAnalysis.java&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toAbsolutePath</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Exists&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">exists</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Directory&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">isDirectory</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Executable&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">isExecutable</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Readable&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">isReadable</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;RegularFile&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">isRegularFile</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Writable&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">isWritable</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;notExists&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">notExists</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Hidden&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">isHidden</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;size&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;FileStore&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">getFileStore</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;LastModified: &quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">getLastModifiedTime</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Owner&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">getOwner</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;ContentType&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">probeContentType</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;SymbolicLink&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">isSymbolicLink</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(Files.</span><span style="color:#B392F0;">isSymbolicLink</span><span style="color:#E1E4E8;">(p))</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;SymbolicLink&quot;</span><span style="color:#E1E4E8;">, Files.</span><span style="color:#B392F0;">readSymbolicLink</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(FileSystems.</span><span style="color:#B392F0;">getDefault</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">supportedFileAttributeViews</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">contains</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;posix&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">say</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;PosixFilePermissions&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">getPosixFilePermissions</span><span style="color:#E1E4E8;">(p));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 输出:</span></span>
<span class="line"><span style="color:#6A737D;">Windows 10</span></span>
<span class="line"><span style="color:#6A737D;">Exists: true</span></span>
<span class="line"><span style="color:#6A737D;">Directory: false</span></span>
<span class="line"><span style="color:#6A737D;">Executable: true</span></span>
<span class="line"><span style="color:#6A737D;">Readable: true</span></span>
<span class="line"><span style="color:#6A737D;">RegularFile: true</span></span>
<span class="line"><span style="color:#6A737D;">Writable: true</span></span>
<span class="line"><span style="color:#6A737D;">notExists: false</span></span>
<span class="line"><span style="color:#6A737D;">Hidden: false</span></span>
<span class="line"><span style="color:#6A737D;">size: 1631</span></span>
<span class="line"><span style="color:#6A737D;">FileStore: SSD (C:)</span></span>
<span class="line"><span style="color:#6A737D;">LastModified: : 2017-05-09T12:07:00.428366Z</span></span>
<span class="line"><span style="color:#6A737D;">Owner: MINDVIEWTOSHIBA\\Bruce (User)</span></span>
<span class="line"><span style="color:#6A737D;">ContentType: null</span></span>
<span class="line"><span style="color:#6A737D;">SymbolicLink: false</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// files/PathAnalysis.java</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.io.IOException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PathAnalysis</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">id</span><span style="color:#24292E;">, Object </span><span style="color:#E36209;">result</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(id </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;: &quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(result);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(System.</span><span style="color:#6F42C1;">getProperty</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;os.name&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        Path p </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;PathAnalysis.java&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toAbsolutePath</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Exists&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">exists</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Directory&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">isDirectory</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Executable&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">isExecutable</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Readable&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">isReadable</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;RegularFile&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">isRegularFile</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Writable&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">isWritable</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;notExists&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">notExists</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Hidden&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">isHidden</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;size&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;FileStore&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">getFileStore</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;LastModified: &quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">getLastModifiedTime</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Owner&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">getOwner</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ContentType&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">probeContentType</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;SymbolicLink&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">isSymbolicLink</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(Files.</span><span style="color:#6F42C1;">isSymbolicLink</span><span style="color:#24292E;">(p))</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;SymbolicLink&quot;</span><span style="color:#24292E;">, Files.</span><span style="color:#6F42C1;">readSymbolicLink</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(FileSystems.</span><span style="color:#6F42C1;">getDefault</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">supportedFileAttributeViews</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">contains</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;posix&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">say</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;PosixFilePermissions&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">getPosixFilePermissions</span><span style="color:#24292E;">(p));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 输出:</span></span>
<span class="line"><span style="color:#6A737D;">Windows 10</span></span>
<span class="line"><span style="color:#6A737D;">Exists: true</span></span>
<span class="line"><span style="color:#6A737D;">Directory: false</span></span>
<span class="line"><span style="color:#6A737D;">Executable: true</span></span>
<span class="line"><span style="color:#6A737D;">Readable: true</span></span>
<span class="line"><span style="color:#6A737D;">RegularFile: true</span></span>
<span class="line"><span style="color:#6A737D;">Writable: true</span></span>
<span class="line"><span style="color:#6A737D;">notExists: false</span></span>
<span class="line"><span style="color:#6A737D;">Hidden: false</span></span>
<span class="line"><span style="color:#6A737D;">size: 1631</span></span>
<span class="line"><span style="color:#6A737D;">FileStore: SSD (C:)</span></span>
<span class="line"><span style="color:#6A737D;">LastModified: : 2017-05-09T12:07:00.428366Z</span></span>
<span class="line"><span style="color:#6A737D;">Owner: MINDVIEWTOSHIBA\\Bruce (User)</span></span>
<span class="line"><span style="color:#6A737D;">ContentType: null</span></span>
<span class="line"><span style="color:#6A737D;">SymbolicLink: false</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><p>在调用最后一个测试方法 <strong>getPosixFilePermissions()</strong> 之前我们需要确认一下当前文件系统是否支持 <strong>Posix</strong> 接口，否则会抛出运行时异常。</p><h3 id="paths的增减修改" tabindex="-1"><strong>Paths</strong>的增减修改 <a class="header-anchor" href="#paths的增减修改" aria-label="Permalink to &quot;**Paths**的增减修改&quot;">​</a></h3><p>我们必须能通过对 <strong>Path</strong> 对象增加或者删除一部分来构造一个新的 <strong>Path</strong> 对象。我们使用 <strong>relativize()</strong> 移除 <strong>Path</strong> 的根路径，使用 <strong>resolve()</strong> 添加 <strong>Path</strong> 的尾路径(不一定是“可发现”的名称)。</p><p>对于下面代码中的示例，我使用 <strong>relativize()</strong> 方法从所有的输出中移除根路径，部分原因是为了示范，部分原因是为了简化输出结果，这说明你可以使用该方法将绝对路径转为相对路径。 这个版本的代码中包含 <strong>id</strong>，以便于跟踪输出结果：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// files/AddAndSubtractPaths.java</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.io.IOException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AddAndSubtractPaths</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> Path base </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;..&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;..&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;..&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toAbsolutePath</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">normalize</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">, Path </span><span style="color:#FFAB70;">result</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(result.</span><span style="color:#B392F0;">isAbsolute</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;(&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> id </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;)r &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> base.</span><span style="color:#B392F0;">relativize</span><span style="color:#E1E4E8;">(result));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;(&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> id </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;) &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> result);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;RealPath: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> result.</span><span style="color:#B392F0;">toRealPath</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;">(IOException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(System.</span><span style="color:#B392F0;">getProperty</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;os.name&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(base);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Path p </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;AddAndSubtractPaths.java&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toAbsolutePath</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, p);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Path convoluted </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> p.</span><span style="color:#B392F0;">getParent</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getParent</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;strings&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;..&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(p.</span><span style="color:#B392F0;">getParent</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getFileName</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, convoluted);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, convoluted.</span><span style="color:#B392F0;">normalize</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        Path p2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;..&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;..&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">, p2);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">, p2.</span><span style="color:#B392F0;">normalize</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">, p2.</span><span style="color:#B392F0;">toAbsolutePath</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">normalize</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        Path p3 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;.&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toAbsolutePath</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Path p4 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> p3.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(p2);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">, p4);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;">, p4.</span><span style="color:#B392F0;">normalize</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        Path p5 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">toAbsolutePath</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">9</span><span style="color:#E1E4E8;">, p5);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">, p5.</span><span style="color:#B392F0;">resolveSibling</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;strings&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">11</span><span style="color:#E1E4E8;">, Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;nonexistent&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 输出:</span></span>
<span class="line"><span style="color:#6A737D;">Windows 10</span></span>
<span class="line"><span style="color:#6A737D;">C:\\Users\\Bruce\\Documents\\GitHub</span></span>
<span class="line"><span style="color:#6A737D;">(1)r onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files\\AddAndSubtractPaths.java</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files\\AddAndSubtractPaths.java</span></span>
<span class="line"><span style="color:#6A737D;">(2)r on-java\\ExtractedExamples\\strings\\..\\files</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">(3)r on-java\\ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">(4) ..\\..</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\on-java</span></span>
<span class="line"><span style="color:#6A737D;">(5) ..\\..</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\on-java</span></span>
<span class="line"><span style="color:#6A737D;">(6)r on-java</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\on-java</span></span>
<span class="line"><span style="color:#6A737D;">(7)r on-java\\ExtractedExamples\\files\\.\\..\\..</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\on-java</span></span>
<span class="line"><span style="color:#6A737D;">(8)r on-java</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\on-java</span></span>
<span class="line"><span style="color:#6A737D;">(9)r on-java\\ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">(10)r on-java\\ExtractedExamples\\strings</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\strings</span></span>
<span class="line"><span style="color:#6A737D;">(11) nonexistent</span></span>
<span class="line"><span style="color:#6A737D;">java.nio.file.NoSuchFileException:</span></span>
<span class="line"><span style="color:#6A737D;">C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files\\nonexistent</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// files/AddAndSubtractPaths.java</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.io.IOException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AddAndSubtractPaths</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> Path base </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;..&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;..&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;..&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toAbsolutePath</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">normalize</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">id</span><span style="color:#24292E;">, Path </span><span style="color:#E36209;">result</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(result.</span><span style="color:#6F42C1;">isAbsolute</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;(&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> id </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;)r &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> base.</span><span style="color:#6F42C1;">relativize</span><span style="color:#24292E;">(result));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;(&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> id </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;) &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> result);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;RealPath: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> result.</span><span style="color:#6F42C1;">toRealPath</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;">(IOException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(System.</span><span style="color:#6F42C1;">getProperty</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;os.name&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(base);</span></span>
<span class="line"><span style="color:#24292E;">        Path p </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;AddAndSubtractPaths.java&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toAbsolutePath</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, p);</span></span>
<span class="line"><span style="color:#24292E;">        Path convoluted </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> p.</span><span style="color:#6F42C1;">getParent</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getParent</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;strings&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;..&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(p.</span><span style="color:#6F42C1;">getParent</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getFileName</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, convoluted);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, convoluted.</span><span style="color:#6F42C1;">normalize</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        Path p2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;..&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;..&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">, p2);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">, p2.</span><span style="color:#6F42C1;">normalize</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">6</span><span style="color:#24292E;">, p2.</span><span style="color:#6F42C1;">toAbsolutePath</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">normalize</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        Path p3 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;.&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toAbsolutePath</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        Path p4 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> p3.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(p2);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">7</span><span style="color:#24292E;">, p4);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">8</span><span style="color:#24292E;">, p4.</span><span style="color:#6F42C1;">normalize</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        Path p5 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">toAbsolutePath</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">9</span><span style="color:#24292E;">, p5);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">, p5.</span><span style="color:#6F42C1;">resolveSibling</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;strings&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">11</span><span style="color:#24292E;">, Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;nonexistent&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 输出:</span></span>
<span class="line"><span style="color:#6A737D;">Windows 10</span></span>
<span class="line"><span style="color:#6A737D;">C:\\Users\\Bruce\\Documents\\GitHub</span></span>
<span class="line"><span style="color:#6A737D;">(1)r onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files\\AddAndSubtractPaths.java</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files\\AddAndSubtractPaths.java</span></span>
<span class="line"><span style="color:#6A737D;">(2)r on-java\\ExtractedExamples\\strings\\..\\files</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">(3)r on-java\\ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">(4) ..\\..</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\on-java</span></span>
<span class="line"><span style="color:#6A737D;">(5) ..\\..</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\on-java</span></span>
<span class="line"><span style="color:#6A737D;">(6)r on-java</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\on-java</span></span>
<span class="line"><span style="color:#6A737D;">(7)r on-java\\ExtractedExamples\\files\\.\\..\\..</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\on-java</span></span>
<span class="line"><span style="color:#6A737D;">(8)r on-java</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\on-java</span></span>
<span class="line"><span style="color:#6A737D;">(9)r on-java\\ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files</span></span>
<span class="line"><span style="color:#6A737D;">(10)r on-java\\ExtractedExamples\\strings</span></span>
<span class="line"><span style="color:#6A737D;">RealPath: C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\strings</span></span>
<span class="line"><span style="color:#6A737D;">(11) nonexistent</span></span>
<span class="line"><span style="color:#6A737D;">java.nio.file.NoSuchFileException:</span></span>
<span class="line"><span style="color:#6A737D;">C:\\Users\\Bruce\\Documents\\GitHub\\onjava\\</span></span>
<span class="line"><span style="color:#6A737D;">ExtractedExamples\\files\\nonexistent</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><p>我还为 <strong>toRealPath()</strong> 添加了更多的测试，这是为了扩展和规则化，防止路径不存在时抛出运行时异常。</p><h2 id="目录" tabindex="-1">目录 <a class="header-anchor" href="#目录" aria-label="Permalink to &quot;目录&quot;">​</a></h2><p><strong>Files</strong> 工具类包含大部分我们需要的目录操作和文件操作方法。出于某种原因，它们没有包含删除目录树相关的方法，因此我们将实现并将其添加到 <strong>onjava</strong> 库中。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// onjava/RmDir.java</span></span>
<span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> onjava;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.attribute.BasicFileAttributes;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.io.IOException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RmDir</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">rmdir</span><span style="color:#E1E4E8;">(Path </span><span style="color:#FFAB70;">dir</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">walkFileTree</span><span style="color:#E1E4E8;">(dir, </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> SimpleFileVisitor&lt;</span><span style="color:#F97583;">Path</span><span style="color:#E1E4E8;">&gt;() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> FileVisitResult </span><span style="color:#B392F0;">visitFile</span><span style="color:#E1E4E8;">(Path </span><span style="color:#FFAB70;">file</span><span style="color:#E1E4E8;">, BasicFileAttributes </span><span style="color:#FFAB70;">attrs</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">                Files.</span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(file);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> FileVisitResult.CONTINUE;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span></span>
<span class="line"><span style="color:#E1E4E8;">            @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> FileVisitResult </span><span style="color:#B392F0;">postVisitDirectory</span><span style="color:#E1E4E8;">(Path </span><span style="color:#FFAB70;">dir</span><span style="color:#E1E4E8;">, IOException </span><span style="color:#FFAB70;">exc</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">                Files.</span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(dir);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> FileVisitResult.CONTINUE;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// onjava/RmDir.java</span></span>
<span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> onjava;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.attribute.BasicFileAttributes;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.io.IOException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RmDir</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">rmdir</span><span style="color:#24292E;">(Path </span><span style="color:#E36209;">dir</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">walkFileTree</span><span style="color:#24292E;">(dir, </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> SimpleFileVisitor&lt;</span><span style="color:#D73A49;">Path</span><span style="color:#24292E;">&gt;() {</span></span>
<span class="line"><span style="color:#24292E;">            @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> FileVisitResult </span><span style="color:#6F42C1;">visitFile</span><span style="color:#24292E;">(Path </span><span style="color:#E36209;">file</span><span style="color:#24292E;">, BasicFileAttributes </span><span style="color:#E36209;">attrs</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">                Files.</span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(file);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> FileVisitResult.CONTINUE;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span></span>
<span class="line"><span style="color:#24292E;">            @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> FileVisitResult </span><span style="color:#6F42C1;">postVisitDirectory</span><span style="color:#24292E;">(Path </span><span style="color:#E36209;">dir</span><span style="color:#24292E;">, IOException </span><span style="color:#E36209;">exc</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">                Files.</span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(dir);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> FileVisitResult.CONTINUE;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>删除目录树的方法实现依赖于 <strong>Files.walkFileTree()</strong>，&quot;walking&quot; 目录树意味着遍历每个子目录和文件。<em>Visitor</em> 设计模式提供了一种标准机制来访问集合中的每个对象，然后你需要提供在每个对象上执行的操作。 此操作的定义取决于实现的 <strong>FileVisitor</strong> 的四个抽象方法，包括：</p><pre><code>1.  **preVisitDirectory()**：在访问目录中条目之前在目录上运行。 
2.  **visitFile()**：运行目录中的每一个文件。  
3.  **visitFileFailed()**：调用无法访问的文件。   
4.  **postVisitDirectory()**：在访问目录中条目之后在目录上运行，包括所有的子目录。
</code></pre><p>为了简化，<strong>java.nio.file.SimpleFileVisitor</strong> 提供了所有方法的默认实现。这样，在我们的匿名内部类中，我们只需要重写非标准行为的方法：<strong>visitFile()</strong> 和 <strong>postVisitDirectory()</strong> 实现删除文件和删除目录。两者都应该返回标志位决定是否继续访问(这样就可以继续访问，直到找到所需要的)。 作为探索目录操作的一部分，现在我们可以有条件地删除已存在的目录。在以下例子中，<strong>makeVariant()</strong> 接受基本目录测试，并通过旋转部件列表生成不同的子目录路径。这些旋转与路径分隔符 <strong>sep</strong> 使用 <strong>String.join()</strong> 贴在一起，然后返回一个 <strong>Path</strong> 对象。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// files/Directories.java</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> onjava.RmDir;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Directories</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> Path test </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> String sep </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> FileSystems.</span><span style="color:#B392F0;">getDefault</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getSeparator</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> List&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; parts </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Arrays.</span><span style="color:#B392F0;">asList</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;foo&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;bar&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;baz&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;bag&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> Path </span><span style="color:#B392F0;">makeVariant</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Collections.</span><span style="color:#B392F0;">rotate</span><span style="color:#E1E4E8;">(parts, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">, String.</span><span style="color:#B392F0;">join</span><span style="color:#E1E4E8;">(sep, parts));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">refreshTestDir</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(Files.</span><span style="color:#B392F0;">exists</span><span style="color:#E1E4E8;">(test))</span></span>
<span class="line"><span style="color:#E1E4E8;">        RmDir.</span><span style="color:#B392F0;">rmdir</span><span style="color:#E1E4E8;">(test);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">Files.</span><span style="color:#B392F0;">exists</span><span style="color:#E1E4E8;">(test))</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">createDirectory</span><span style="color:#E1E4E8;">(test);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">refreshTestDir</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">createFile</span><span style="color:#E1E4E8;">(test.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Hello.txt&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        Path variant </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">makeVariant</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Throws exception (too many levels):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            Files.</span><span style="color:#B392F0;">createDirectory</span><span style="color:#E1E4E8;">(variant);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;">(Exception </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Nope, that doesn&#39;t work.&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">populateTestDir</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Path tempdir </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Files.</span><span style="color:#B392F0;">createTempDirectory</span><span style="color:#E1E4E8;">(test, </span><span style="color:#9ECBFF;">&quot;DIR_&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">createTempFile</span><span style="color:#E1E4E8;">(tempdir, </span><span style="color:#9ECBFF;">&quot;pre&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;.non&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">newDirectoryStream</span><span style="color:#E1E4E8;">(test).</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(System.out</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">println);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;*********&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">(test).</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(System.out</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">println);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">populateTestDir</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception  {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> parts.</span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">(); i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            Path variant </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">makeVariant</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">Files.</span><span style="color:#B392F0;">exists</span><span style="color:#E1E4E8;">(variant)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                Files.</span><span style="color:#B392F0;">createDirectories</span><span style="color:#E1E4E8;">(variant);</span></span>
<span class="line"><span style="color:#E1E4E8;">                Files.</span><span style="color:#B392F0;">copy</span><span style="color:#E1E4E8;">(Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Directories.java&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">                    variant.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;File.txt&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">                Files.</span><span style="color:#B392F0;">createTempFile</span><span style="color:#E1E4E8;">(variant, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 输出:</span></span>
<span class="line"><span style="color:#6A737D;">Nope, that doesn&#39;t work.</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz</span></span>
<span class="line"><span style="color:#6A737D;">test\\DIR_5142667942049986036</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo</span></span>
<span class="line"><span style="color:#6A737D;">test\\Hello.txt</span></span>
<span class="line"><span style="color:#6A737D;">*********</span></span>
<span class="line"><span style="color:#6A737D;">test</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag\\foo</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag\\foo\\bar</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag\\foo\\bar\\baz</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag\\foo\\bar\\baz\\8279660869874696036.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag\\foo\\bar\\baz\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar\\baz</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar\\baz\\bag</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar\\baz\\bag\\foo</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar\\baz\\bag\\foo\\1274043134240426261.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar\\baz\\bag\\foo\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz\\bag</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz\\bag\\foo</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz\\bag\\foo\\bar</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz\\bag\\foo\\bar\\6130572530014544105.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz\\bag\\foo\\bar\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">test\\DIR_5142667942049986036</span></span>
<span class="line"><span style="color:#6A737D;">test\\DIR_5142667942049986036\\pre7704286843227113253.non</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo\\bar</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo\\bar\\baz</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo\\bar\\baz\\bag</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo\\bar\\baz\\bag\\5412864507741775436.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo\\bar\\baz\\bag\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">test\\Hello.txt</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// files/Directories.java</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> onjava.RmDir;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Directories</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> Path test </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> String sep </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> FileSystems.</span><span style="color:#6F42C1;">getDefault</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getSeparator</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> List&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; parts </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Arrays.</span><span style="color:#6F42C1;">asList</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;foo&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;bar&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;baz&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;bag&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> Path </span><span style="color:#6F42C1;">makeVariant</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        Collections.</span><span style="color:#6F42C1;">rotate</span><span style="color:#24292E;">(parts, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">, String.</span><span style="color:#6F42C1;">join</span><span style="color:#24292E;">(sep, parts));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">refreshTestDir</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(Files.</span><span style="color:#6F42C1;">exists</span><span style="color:#24292E;">(test))</span></span>
<span class="line"><span style="color:#24292E;">        RmDir.</span><span style="color:#6F42C1;">rmdir</span><span style="color:#24292E;">(test);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">Files.</span><span style="color:#6F42C1;">exists</span><span style="color:#24292E;">(test))</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">createDirectory</span><span style="color:#24292E;">(test);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">refreshTestDir</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">createFile</span><span style="color:#24292E;">(test.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Hello.txt&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        Path variant </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">makeVariant</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Throws exception (too many levels):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            Files.</span><span style="color:#6F42C1;">createDirectory</span><span style="color:#24292E;">(variant);</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;">(Exception </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Nope, that doesn&#39;t work.&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">populateTestDir</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        Path tempdir </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Files.</span><span style="color:#6F42C1;">createTempDirectory</span><span style="color:#24292E;">(test, </span><span style="color:#032F62;">&quot;DIR_&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">createTempFile</span><span style="color:#24292E;">(tempdir, </span><span style="color:#032F62;">&quot;pre&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;.non&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">newDirectoryStream</span><span style="color:#24292E;">(test).</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(System.out</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">println);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;*********&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">(test).</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(System.out</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">println);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">populateTestDir</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception  {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> parts.</span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">(); i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            Path variant </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">makeVariant</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">Files.</span><span style="color:#6F42C1;">exists</span><span style="color:#24292E;">(variant)) {</span></span>
<span class="line"><span style="color:#24292E;">                Files.</span><span style="color:#6F42C1;">createDirectories</span><span style="color:#24292E;">(variant);</span></span>
<span class="line"><span style="color:#24292E;">                Files.</span><span style="color:#6F42C1;">copy</span><span style="color:#24292E;">(Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Directories.java&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">                    variant.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;File.txt&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">                Files.</span><span style="color:#6F42C1;">createTempFile</span><span style="color:#24292E;">(variant, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* 输出:</span></span>
<span class="line"><span style="color:#6A737D;">Nope, that doesn&#39;t work.</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz</span></span>
<span class="line"><span style="color:#6A737D;">test\\DIR_5142667942049986036</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo</span></span>
<span class="line"><span style="color:#6A737D;">test\\Hello.txt</span></span>
<span class="line"><span style="color:#6A737D;">*********</span></span>
<span class="line"><span style="color:#6A737D;">test</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag\\foo</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag\\foo\\bar</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag\\foo\\bar\\baz</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag\\foo\\bar\\baz\\8279660869874696036.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag\\foo\\bar\\baz\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar\\baz</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar\\baz\\bag</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar\\baz\\bag\\foo</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar\\baz\\bag\\foo\\1274043134240426261.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar\\baz\\bag\\foo\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz\\bag</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz\\bag\\foo</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz\\bag\\foo\\bar</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz\\bag\\foo\\bar\\6130572530014544105.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz\\bag\\foo\\bar\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">test\\DIR_5142667942049986036</span></span>
<span class="line"><span style="color:#6A737D;">test\\DIR_5142667942049986036\\pre7704286843227113253.non</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo\\bar</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo\\bar\\baz</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo\\bar\\baz\\bag</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo\\bar\\baz\\bag\\5412864507741775436.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo\\bar\\baz\\bag\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">test\\Hello.txt</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><p>首先，<strong>refreshTestDir()</strong> 用于检测 <strong>test</strong> 目录是否已经存在。若存在，则使用我们新工具类 <strong>rmdir()</strong> 删除其整个目录。检查是否 <strong>exists</strong> 是多余的，但我想说明一点，因为如果你对于已经存在的目录调用 <strong>createDirectory()</strong> 将会抛出异常。<strong>createFile()</strong> 使用参数 <strong>Path</strong> 创建一个空文件; <strong>resolve()</strong> 将文件名添加到 <strong>test Path</strong> 的末尾。</p><p>我们尝试使用 <strong>createDirectory()</strong> 来创建多级路径，但是这样会抛出异常，因为这个方法只能创建单级路径。我已经将 <strong>populateTestDir()</strong> 作为一个单独的方法，因为它将在后面的例子中被重用。对于每一个变量 <strong>variant</strong>，我们都能使用 <strong>createDirectories()</strong> 创建完整的目录路径，然后使用此文件的副本以不同的目标名称填充该终端目录。然后我们使用 <strong>createTempFile()</strong> 生成一个临时文件。</p><p>在调用 <strong>populateTestDir()</strong> 之后，我们在 <strong>test</strong> 目录下面下面创建一个临时目录。请注意，<strong>createTempDirectory()</strong> 只有名称的前缀选项。与 <strong>createTempFile()</strong> 不同，我们再次使用它将临时文件放入新的临时目录中。你可以从输出中看到，如果未指定后缀，它将默认使用&quot;.tmp&quot;作为后缀。</p><p>为了展示结果，我们首次使用看起来很有希望的 <strong>newDirectoryStream()</strong>，但事实证明这个方法只是返回 <strong>test</strong> 目录内容的 Stream 流，并没有更多的内容。要获取目录树的全部内容的流，请使用 <strong>Files.walk()</strong>。</p><h2 id="文件系统" tabindex="-1">文件系统 <a class="header-anchor" href="#文件系统" aria-label="Permalink to &quot;文件系统&quot;">​</a></h2><p>为了完整起见，我们需要一种方法查找文件系统相关的其他信息。在这里，我们使用静态的 <strong>FileSystems</strong> 工具类获取&quot;默认&quot;的文件系统，但你同样也可以在 <strong>Path</strong> 对象上调用 <strong>getFileSystem()</strong> 以获取创建该 <strong>Path</strong> 的文件系统。你可以获得给定 <em>URI</em> 的文件系统，还可以构建新的文件系统(对于支持它的操作系统)。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// files/FileSystemDemo.java</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FileSystemDemo</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">, Object </span><span style="color:#FFAB70;">o</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(id </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> o);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(System.</span><span style="color:#B392F0;">getProperty</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;os.name&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        FileSystem fsys </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> FileSystems.</span><span style="color:#B392F0;">getDefault</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(FileStore fs </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> fsys.</span><span style="color:#B392F0;">getFileStores</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;File Store&quot;</span><span style="color:#E1E4E8;">, fs);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(Path rd </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> fsys.</span><span style="color:#B392F0;">getRootDirectories</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Root Directory&quot;</span><span style="color:#E1E4E8;">, rd);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Separator&quot;</span><span style="color:#E1E4E8;">, fsys.</span><span style="color:#B392F0;">getSeparator</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;UserPrincipalLookupService&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            fsys.</span><span style="color:#B392F0;">getUserPrincipalLookupService</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;isOpen&quot;</span><span style="color:#E1E4E8;">, fsys.</span><span style="color:#B392F0;">isOpen</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;isReadOnly&quot;</span><span style="color:#E1E4E8;">, fsys.</span><span style="color:#B392F0;">isReadOnly</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;FileSystemProvider&quot;</span><span style="color:#E1E4E8;">, fsys.</span><span style="color:#B392F0;">provider</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;File Attribute Views&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        fsys.</span><span style="color:#B392F0;">supportedFileAttributeViews</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">/* 输出:</span></span>
<span class="line"><span style="color:#6A737D;">Windows 10</span></span>
<span class="line"><span style="color:#6A737D;">File Store: SSD (C:)</span></span>
<span class="line"><span style="color:#6A737D;">Root Directory: C:\\</span></span>
<span class="line"><span style="color:#6A737D;">Root Directory: D:\\</span></span>
<span class="line"><span style="color:#6A737D;">Separator: \\</span></span>
<span class="line"><span style="color:#6A737D;">UserPrincipalLookupService:</span></span>
<span class="line"><span style="color:#6A737D;">sun.nio.fs.WindowsFileSystem$LookupService$1@15db9742</span></span>
<span class="line"><span style="color:#6A737D;">isOpen: true</span></span>
<span class="line"><span style="color:#6A737D;">isReadOnly: false</span></span>
<span class="line"><span style="color:#6A737D;">FileSystemProvider:</span></span>
<span class="line"><span style="color:#6A737D;">sun.nio.fs.WindowsFileSystemProvider@6d06d69c</span></span>
<span class="line"><span style="color:#6A737D;">File Attribute Views: [owner, dos, acl, basic, user]</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// files/FileSystemDemo.java</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FileSystemDemo</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">id</span><span style="color:#24292E;">, Object </span><span style="color:#E36209;">o</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(id </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> o);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(System.</span><span style="color:#6F42C1;">getProperty</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;os.name&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        FileSystem fsys </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> FileSystems.</span><span style="color:#6F42C1;">getDefault</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;">(FileStore fs </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> fsys.</span><span style="color:#6F42C1;">getFileStores</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;File Store&quot;</span><span style="color:#24292E;">, fs);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;">(Path rd </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> fsys.</span><span style="color:#6F42C1;">getRootDirectories</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Root Directory&quot;</span><span style="color:#24292E;">, rd);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Separator&quot;</span><span style="color:#24292E;">, fsys.</span><span style="color:#6F42C1;">getSeparator</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;UserPrincipalLookupService&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            fsys.</span><span style="color:#6F42C1;">getUserPrincipalLookupService</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;isOpen&quot;</span><span style="color:#24292E;">, fsys.</span><span style="color:#6F42C1;">isOpen</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;isReadOnly&quot;</span><span style="color:#24292E;">, fsys.</span><span style="color:#6F42C1;">isReadOnly</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;FileSystemProvider&quot;</span><span style="color:#24292E;">, fsys.</span><span style="color:#6F42C1;">provider</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;File Attribute Views&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        fsys.</span><span style="color:#6F42C1;">supportedFileAttributeViews</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">/* 输出:</span></span>
<span class="line"><span style="color:#6A737D;">Windows 10</span></span>
<span class="line"><span style="color:#6A737D;">File Store: SSD (C:)</span></span>
<span class="line"><span style="color:#6A737D;">Root Directory: C:\\</span></span>
<span class="line"><span style="color:#6A737D;">Root Directory: D:\\</span></span>
<span class="line"><span style="color:#6A737D;">Separator: \\</span></span>
<span class="line"><span style="color:#6A737D;">UserPrincipalLookupService:</span></span>
<span class="line"><span style="color:#6A737D;">sun.nio.fs.WindowsFileSystem$LookupService$1@15db9742</span></span>
<span class="line"><span style="color:#6A737D;">isOpen: true</span></span>
<span class="line"><span style="color:#6A737D;">isReadOnly: false</span></span>
<span class="line"><span style="color:#6A737D;">FileSystemProvider:</span></span>
<span class="line"><span style="color:#6A737D;">sun.nio.fs.WindowsFileSystemProvider@6d06d69c</span></span>
<span class="line"><span style="color:#6A737D;">File Attribute Views: [owner, dos, acl, basic, user]</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><p>一个 <strong>FileSystem</strong> 对象也能生成 <strong>WatchService</strong> 和 <strong>PathMatcher</strong> 对象，将会在接下来两章中详细讲解。</p><h2 id="路径监听" tabindex="-1">路径监听 <a class="header-anchor" href="#路径监听" aria-label="Permalink to &quot;路径监听&quot;">​</a></h2><p>通过 <strong>WatchService</strong> 可以设置一个进程对目录中的更改做出响应。在这个例子中，<strong>delTxtFiles()</strong> 作为一个单独的任务执行，该任务将遍历整个目录并删除以 <strong>.txt</strong> 结尾的所有文件，<strong>WatchService</strong> 会对文件删除操作做出反应：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// files/PathWatcher.java</span></span>
<span class="line"><span style="color:#6A737D;">// {ExcludeFromGradle}</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.io.IOException;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> java.nio.file.StandardWatchEventKinds.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.concurrent.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PathWatcher</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> Path test </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">delTxtFiles</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            Files.</span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">(test)</span></span>
<span class="line"><span style="color:#E1E4E8;">            .</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(f </span><span style="color:#F97583;">-&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">                f.</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">endsWith</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;.txt&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(f </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;deleting &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> f);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    Files.</span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(f);</span></span>
<span class="line"><span style="color:#E1E4E8;">                } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;">(IOException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RuntimeException</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            });</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;">(IOException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RuntimeException</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Directories.</span><span style="color:#B392F0;">refreshTestDir</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Directories.</span><span style="color:#B392F0;">populateTestDir</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">createFile</span><span style="color:#E1E4E8;">(test.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Hello.txt&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        WatchService watcher </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> FileSystems.</span><span style="color:#B392F0;">getDefault</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">newWatchService</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        test.</span><span style="color:#B392F0;">register</span><span style="color:#E1E4E8;">(watcher, ENTRY_DELETE);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Executors.</span><span style="color:#B392F0;">newSingleThreadScheduledExecutor</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">schedule</span><span style="color:#E1E4E8;">(PathWatcher</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">delTxtFiles,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">250</span><span style="color:#E1E4E8;">, TimeUnit.MILLISECONDS);</span></span>
<span class="line"><span style="color:#E1E4E8;">        WatchKey key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> watcher.</span><span style="color:#B392F0;">take</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(WatchEvent evt </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> key.</span><span style="color:#B392F0;">pollEvents</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;evt.context(): &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> evt.</span><span style="color:#B392F0;">context</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">evt.count(): &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> evt.</span><span style="color:#B392F0;">count</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">evt.kind(): &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> evt.</span><span style="color:#B392F0;">kind</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.</span><span style="color:#B392F0;">exit</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">/* Output:</span></span>
<span class="line"><span style="color:#6A737D;">deleting test\\bag\\foo\\bar\\baz\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">deleting test\\bar\\baz\\bag\\foo\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">deleting test\\baz\\bag\\foo\\bar\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">deleting test\\foo\\bar\\baz\\bag\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">deleting test\\Hello.txt</span></span>
<span class="line"><span style="color:#6A737D;">evt.context(): Hello.txt</span></span>
<span class="line"><span style="color:#6A737D;">evt.count(): 1</span></span>
<span class="line"><span style="color:#6A737D;">evt.kind(): ENTRY_DELETE</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// files/PathWatcher.java</span></span>
<span class="line"><span style="color:#6A737D;">// {ExcludeFromGradle}</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.io.IOException;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> java.nio.file.StandardWatchEventKinds.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.concurrent.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PathWatcher</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> Path test </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">delTxtFiles</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            Files.</span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">(test)</span></span>
<span class="line"><span style="color:#24292E;">            .</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(f </span><span style="color:#D73A49;">-&gt;</span></span>
<span class="line"><span style="color:#24292E;">                f.</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">endsWith</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;.txt&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(f </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;deleting &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> f);</span></span>
<span class="line"><span style="color:#24292E;">                    Files.</span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(f);</span></span>
<span class="line"><span style="color:#24292E;">                } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;">(IOException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RuntimeException</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            });</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;">(IOException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RuntimeException</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">        Directories.</span><span style="color:#6F42C1;">refreshTestDir</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        Directories.</span><span style="color:#6F42C1;">populateTestDir</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">createFile</span><span style="color:#24292E;">(test.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Hello.txt&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        WatchService watcher </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> FileSystems.</span><span style="color:#6F42C1;">getDefault</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">newWatchService</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        test.</span><span style="color:#6F42C1;">register</span><span style="color:#24292E;">(watcher, ENTRY_DELETE);</span></span>
<span class="line"><span style="color:#24292E;">        Executors.</span><span style="color:#6F42C1;">newSingleThreadScheduledExecutor</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">schedule</span><span style="color:#24292E;">(PathWatcher</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">delTxtFiles,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">250</span><span style="color:#24292E;">, TimeUnit.MILLISECONDS);</span></span>
<span class="line"><span style="color:#24292E;">        WatchKey key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> watcher.</span><span style="color:#6F42C1;">take</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;">(WatchEvent evt </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> key.</span><span style="color:#6F42C1;">pollEvents</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;evt.context(): &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> evt.</span><span style="color:#6F42C1;">context</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">evt.count(): &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> evt.</span><span style="color:#6F42C1;">count</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">evt.kind(): &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> evt.</span><span style="color:#6F42C1;">kind</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.</span><span style="color:#6F42C1;">exit</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">/* Output:</span></span>
<span class="line"><span style="color:#6A737D;">deleting test\\bag\\foo\\bar\\baz\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">deleting test\\bar\\baz\\bag\\foo\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">deleting test\\baz\\bag\\foo\\bar\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">deleting test\\foo\\bar\\baz\\bag\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">deleting test\\Hello.txt</span></span>
<span class="line"><span style="color:#6A737D;">evt.context(): Hello.txt</span></span>
<span class="line"><span style="color:#6A737D;">evt.count(): 1</span></span>
<span class="line"><span style="color:#6A737D;">evt.kind(): ENTRY_DELETE</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><p><strong>delTxtFiles()</strong> 中的 <strong>try</strong> 代码块看起来有些多余，因为它们捕获的是同一种类型的异常，外部的 <strong>try</strong> 语句似乎已经足够了。然而出于某种原因，Java 要求两者都必须存在(这也可能是一个 bug)。还要注意的是在 <strong>filter()</strong> 中，我们必须显式地使用 <strong>f.toString()</strong> 转为字符串，否则我们调用 <strong>endsWith()</strong> 将会与整个 <strong>Path</strong> 对象进行比较，而不是路径名称字符串的一部分进行比较。</p><p>一旦我们从 <strong>FileSystem</strong> 中得到了 <strong>WatchService</strong> 对象，我们将其注册到 <strong>test</strong> 路径以及我们感兴趣的项目的变量参数列表中，可以选择 <strong>ENTRY_CREATE</strong>，<strong>ENTRY_DELETE</strong> 或 <strong>ENTRY_MODIFY</strong>(其中创建和删除不属于修改)。</p><p>因为接下来对 <strong>watcher.take()</strong> 的调用会在发生某些事情之前停止所有操作，所以我们希望 <strong>deltxtfiles()</strong> 能够并行运行以便生成我们感兴趣的事件。为了实现这个目的，我通过调用 <strong>Executors.newSingleThreadScheduledExecutor()</strong> 产生一个 <strong>ScheduledExecutorService</strong> 对象，然后调用 <strong>schedule()</strong> 方法传递所需函数的方法引用，并且设置在运行之前应该等待的时间。</p><p>此时，<strong>watcher.take()</strong> 将等待并阻塞在这里。当目标事件发生时，会返回一个包含 <strong>WatchEvent</strong> 的 <strong>Watchkey</strong> 对象。展示的这三种方法是能对 <strong>WatchEvent</strong> 执行的全部操作。</p><p>查看输出的具体内容。即使我们正在删除以 <strong>.txt</strong> 结尾的文件，在 <strong>Hello.txt</strong> 被删除之前，<strong>WatchService</strong> 也不会被触发。你可能认为，如果说&quot;监视这个目录&quot;，自然会包含整个目录和下面子目录，但实际上的：只会监视给定的目录，而不是下面的所有内容。如果需要监视整个树目录，必须在整个树的每个子目录上放置一个 <strong>Watchservice</strong>。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// files/TreeWatcher.java</span></span>
<span class="line"><span style="color:#6A737D;">// {ExcludeFromGradle}</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.io.IOException;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> java.nio.file.StandardWatchEventKinds.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.concurrent.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TreeWatcher</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">watchDir</span><span style="color:#E1E4E8;">(Path </span><span style="color:#FFAB70;">dir</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            WatchService watcher </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">            FileSystems.</span><span style="color:#B392F0;">getDefault</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">newWatchService</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            dir.</span><span style="color:#B392F0;">register</span><span style="color:#E1E4E8;">(watcher, ENTRY_DELETE);</span></span>
<span class="line"><span style="color:#E1E4E8;">            Executors.</span><span style="color:#B392F0;">newSingleThreadExecutor</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">submit</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    WatchKey key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> watcher.</span><span style="color:#B392F0;">take</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(WatchEvent evt </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> key.</span><span style="color:#B392F0;">pollEvents</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#9ECBFF;">&quot;evt.context(): &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> evt.</span><span style="color:#B392F0;">context</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">evt.count(): &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> evt.</span><span style="color:#B392F0;">count</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">\\n</span><span style="color:#9ECBFF;">evt.kind(): &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> evt.</span><span style="color:#B392F0;">kind</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">                        System.</span><span style="color:#B392F0;">exit</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;">(InterruptedException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            });</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;">(IOException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RuntimeException</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Directories.</span><span style="color:#B392F0;">refreshTestDir</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Directories.</span><span style="color:#B392F0;">populateTestDir</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">(Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">            .</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(Files</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">isDirectory)</span></span>
<span class="line"><span style="color:#E1E4E8;">            .</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(TreeWatcher</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">watchDir);</span></span>
<span class="line"><span style="color:#E1E4E8;">        PathWatcher.</span><span style="color:#B392F0;">delTxtFiles</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* Output:</span></span>
<span class="line"><span style="color:#6A737D;">deleting test\\bag\\foo\\bar\\baz\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">deleting test\\bar\\baz\\bag\\foo\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">evt.context(): File.txt</span></span>
<span class="line"><span style="color:#6A737D;">evt.count(): 1</span></span>
<span class="line"><span style="color:#6A737D;">evt.kind(): ENTRY_DELETE</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// files/TreeWatcher.java</span></span>
<span class="line"><span style="color:#6A737D;">// {ExcludeFromGradle}</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.io.IOException;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> java.nio.file.StandardWatchEventKinds.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.concurrent.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TreeWatcher</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">watchDir</span><span style="color:#24292E;">(Path </span><span style="color:#E36209;">dir</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            WatchService watcher </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">            FileSystems.</span><span style="color:#6F42C1;">getDefault</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">newWatchService</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            dir.</span><span style="color:#6F42C1;">register</span><span style="color:#24292E;">(watcher, ENTRY_DELETE);</span></span>
<span class="line"><span style="color:#24292E;">            Executors.</span><span style="color:#6F42C1;">newSingleThreadExecutor</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">submit</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                    WatchKey key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> watcher.</span><span style="color:#6F42C1;">take</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;">(WatchEvent evt </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> key.</span><span style="color:#6F42C1;">pollEvents</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">                        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#032F62;">&quot;evt.context(): &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> evt.</span><span style="color:#6F42C1;">context</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">evt.count(): &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> evt.</span><span style="color:#6F42C1;">count</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">\\n</span><span style="color:#032F62;">evt.kind(): &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> evt.</span><span style="color:#6F42C1;">kind</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">                        System.</span><span style="color:#6F42C1;">exit</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;">(InterruptedException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            });</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;">(IOException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RuntimeException</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">        Directories.</span><span style="color:#6F42C1;">refreshTestDir</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        Directories.</span><span style="color:#6F42C1;">populateTestDir</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">(Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">            .</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(Files</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">isDirectory)</span></span>
<span class="line"><span style="color:#24292E;">            .</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(TreeWatcher</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">watchDir);</span></span>
<span class="line"><span style="color:#24292E;">        PathWatcher.</span><span style="color:#6F42C1;">delTxtFiles</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/* Output:</span></span>
<span class="line"><span style="color:#6A737D;">deleting test\\bag\\foo\\bar\\baz\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">deleting test\\bar\\baz\\bag\\foo\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">evt.context(): File.txt</span></span>
<span class="line"><span style="color:#6A737D;">evt.count(): 1</span></span>
<span class="line"><span style="color:#6A737D;">evt.kind(): ENTRY_DELETE</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><p>在 <strong>watchDir()</strong> 方法中给 <strong>WatchSevice</strong> 提供参数 <strong>ENTRY_DELETE</strong>，并启动一个独立的线程来监视该<strong>Watchservice</strong>。这里我们没有使用 <strong>schedule()</strong> 进行启动，而是使用 <strong>submit()</strong> 启动线程。我们遍历整个目录树，并将 <strong>watchDir()</strong> 应用于每个子目录。现在，当我们运行 <strong>deltxtfiles()</strong> 时，其中一个 <strong>Watchservice</strong> 会检测到每一次文件删除。</p><h2 id="文件查找" tabindex="-1">文件查找 <a class="header-anchor" href="#文件查找" aria-label="Permalink to &quot;文件查找&quot;">​</a></h2><p>到目前为止，为了找到文件，我们一直使用相当粗糙的方法，在 <code>path</code> 上调用 <code>toString()</code>，然后使用 <code>string</code> 操作查看结果。事实证明，<code>java.nio.file</code> 有更好的解决方案：通过在 <code>FileSystem</code> 对象上调用 <code>getPathMatcher()</code> 获得一个 <code>PathMatcher</code>，然后传入您感兴趣的模式。模式有两个选项：<code>glob</code> 和 <code>regex</code>。<code>glob</code> 比较简单，实际上功能非常强大，因此您可以使用 <code>glob</code> 解决许多问题。如果您的问题更复杂，可以使用 <code>regex</code>，这将在接下来的 <code>Strings</code> 一章中解释。</p><p>在这里，我们使用 <code>glob</code> 查找以 <code>.tmp</code> 或 <code>.txt</code> 结尾的所有 <code>Path</code>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// files/Find.java</span></span>
<span class="line"><span style="color:#6A737D;">// {ExcludeFromGradle}</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Find</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Path test </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Directories.</span><span style="color:#B392F0;">refreshTestDir</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Directories.</span><span style="color:#B392F0;">populateTestDir</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Creating a *directory*, not a file:</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">createDirectory</span><span style="color:#E1E4E8;">(test.</span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;dir.tmp&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        PathMatcher matcher </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> FileSystems.</span><span style="color:#B392F0;">getDefault</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">getPathMatcher</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;glob:**/*.{tmp,txt}&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">(test)</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(matcher</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">matches)</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(System.out</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">println);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;***************&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        PathMatcher matcher2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> FileSystems.</span><span style="color:#B392F0;">getDefault</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">getPathMatcher</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;glob:*.tmp&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">(test)</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(Path</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">getFileName)</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(matcher2</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">matches)</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(System.out</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">println);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;***************&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">walk</span><span style="color:#E1E4E8;">(test) </span><span style="color:#6A737D;">// Only look for files</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(Files</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">isRegularFile)</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(Path</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">getFileName)</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(matcher2</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">matches)</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(System.out</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">println);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">/* Output:</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag\\foo\\bar\\baz\\5208762845883213974.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag\\foo\\bar\\baz\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar\\baz\\bag\\foo\\7918367201207778677.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar\\baz\\bag\\foo\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz\\bag\\foo\\bar\\8016595521026696632.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz\\bag\\foo\\bar\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">test\\dir.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo\\bar\\baz\\bag\\5832319279813617280.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo\\bar\\baz\\bag\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">***************</span></span>
<span class="line"><span style="color:#6A737D;">5208762845883213974.tmp</span></span>
<span class="line"><span style="color:#6A737D;">7918367201207778677.tmp</span></span>
<span class="line"><span style="color:#6A737D;">8016595521026696632.tmp</span></span>
<span class="line"><span style="color:#6A737D;">dir.tmp</span></span>
<span class="line"><span style="color:#6A737D;">5832319279813617280.tmp</span></span>
<span class="line"><span style="color:#6A737D;">***************</span></span>
<span class="line"><span style="color:#6A737D;">5208762845883213974.tmp</span></span>
<span class="line"><span style="color:#6A737D;">7918367201207778677.tmp</span></span>
<span class="line"><span style="color:#6A737D;">8016595521026696632.tmp</span></span>
<span class="line"><span style="color:#6A737D;">5832319279813617280.tmp</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// files/Find.java</span></span>
<span class="line"><span style="color:#6A737D;">// {ExcludeFromGradle}</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Find</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">        Path test </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        Directories.</span><span style="color:#6F42C1;">refreshTestDir</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        Directories.</span><span style="color:#6F42C1;">populateTestDir</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Creating a *directory*, not a file:</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">createDirectory</span><span style="color:#24292E;">(test.</span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;dir.tmp&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        PathMatcher matcher </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> FileSystems.</span><span style="color:#6F42C1;">getDefault</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">getPathMatcher</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;glob:**/*.{tmp,txt}&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">(test)</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(matcher</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">matches)</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(System.out</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">println);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;***************&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        PathMatcher matcher2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> FileSystems.</span><span style="color:#6F42C1;">getDefault</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">getPathMatcher</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;glob:*.tmp&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">(test)</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(Path</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">getFileName)</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(matcher2</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">matches)</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(System.out</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">println);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;***************&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">walk</span><span style="color:#24292E;">(test) </span><span style="color:#6A737D;">// Only look for files</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(Files</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">isRegularFile)</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(Path</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">getFileName)</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(matcher2</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">matches)</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(System.out</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">println);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">/* Output:</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag\\foo\\bar\\baz\\5208762845883213974.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\bag\\foo\\bar\\baz\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar\\baz\\bag\\foo\\7918367201207778677.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\bar\\baz\\bag\\foo\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz\\bag\\foo\\bar\\8016595521026696632.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\baz\\bag\\foo\\bar\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">test\\dir.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo\\bar\\baz\\bag\\5832319279813617280.tmp</span></span>
<span class="line"><span style="color:#6A737D;">test\\foo\\bar\\baz\\bag\\File.txt</span></span>
<span class="line"><span style="color:#6A737D;">***************</span></span>
<span class="line"><span style="color:#6A737D;">5208762845883213974.tmp</span></span>
<span class="line"><span style="color:#6A737D;">7918367201207778677.tmp</span></span>
<span class="line"><span style="color:#6A737D;">8016595521026696632.tmp</span></span>
<span class="line"><span style="color:#6A737D;">dir.tmp</span></span>
<span class="line"><span style="color:#6A737D;">5832319279813617280.tmp</span></span>
<span class="line"><span style="color:#6A737D;">***************</span></span>
<span class="line"><span style="color:#6A737D;">5208762845883213974.tmp</span></span>
<span class="line"><span style="color:#6A737D;">7918367201207778677.tmp</span></span>
<span class="line"><span style="color:#6A737D;">8016595521026696632.tmp</span></span>
<span class="line"><span style="color:#6A737D;">5832319279813617280.tmp</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><p>在 <code>matcher</code> 中，<code>glob</code> 表达式开头的 <code>**/</code> 表示“当前目录及所有子目录”，这在当你不仅仅要匹配当前目录下特定结尾的 <code>Path</code> 时非常有用。单 <code>*</code> 表示“任何东西”，然后是一个点，然后大括号表示一系列的可能性---我们正在寻找以 <code>.tmp</code> 或 <code>.txt</code> 结尾的东西。您可以在 <code>getPathMatcher()</code> 文档中找到更多详细信息。</p><p><code>matcher2</code> 只使用 <code>*.tmp</code>，通常不匹配任何内容，但是添加 <code>map()</code> 操作会将完整路径减少到末尾的名称。</p><p>注意，在这两种情况下，输出中都会出现 <code>dir.tmp</code>，即使它是一个目录而不是一个文件。要只查找文件，必须像在最后 <code>files.walk()</code> 中那样对其进行筛选。</p><h2 id="文件读写" tabindex="-1">文件读写 <a class="header-anchor" href="#文件读写" aria-label="Permalink to &quot;文件读写&quot;">​</a></h2><p>此时，我们可以对路径和目录做任何事情。 现在让我们看一下操纵文件本身的内容。</p><p>如果一个文件很“小”，也就是说“它运行得足够快且占用内存小”，那么 <code>java.nio.file.Files</code> 类中的实用程序将帮助你轻松读写文本和二进制文件。</p><p><code>Files.readAllLines()</code> 一次读取整个文件（因此，“小”文件很有必要），产生一个<code>List&lt;String&gt;</code>。 对于示例文件，我们将重用<code>streams/Cheese.dat</code>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// files/ListOfLines.java</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ListOfLines</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">readAllLines</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;../streams/Cheese.dat&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">stream</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(line </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">line.</span><span style="color:#B392F0;">startsWith</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;//&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(line </span><span style="color:#F97583;">-&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">            line.</span><span style="color:#B392F0;">substring</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, line.</span><span style="color:#B392F0;">length</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(System.out</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">println);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">/* Output:</span></span>
<span class="line"><span style="color:#6A737D;">Not much of a cheese</span></span>
<span class="line"><span style="color:#6A737D;">Finest in the</span></span>
<span class="line"><span style="color:#6A737D;">And what leads you</span></span>
<span class="line"><span style="color:#6A737D;">Well, it&#39;s</span></span>
<span class="line"><span style="color:#6A737D;">It&#39;s certainly uncon</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// files/ListOfLines.java</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ListOfLines</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">readAllLines</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;../streams/Cheese.dat&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">stream</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(line </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">line.</span><span style="color:#6F42C1;">startsWith</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;//&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(line </span><span style="color:#D73A49;">-&gt;</span></span>
<span class="line"><span style="color:#24292E;">            line.</span><span style="color:#6F42C1;">substring</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, line.</span><span style="color:#6F42C1;">length</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(System.out</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">println);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">/* Output:</span></span>
<span class="line"><span style="color:#6A737D;">Not much of a cheese</span></span>
<span class="line"><span style="color:#6A737D;">Finest in the</span></span>
<span class="line"><span style="color:#6A737D;">And what leads you</span></span>
<span class="line"><span style="color:#6A737D;">Well, it&#39;s</span></span>
<span class="line"><span style="color:#6A737D;">It&#39;s certainly uncon</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><p>跳过注释行，其余的内容每行只打印一半。 这实现起来很简单：你只需将 <code>Path</code> 传递给 <code>readAllLines()</code> （以前的 java 实现这个功能很复杂）。<code>readAllLines()</code> 有一个重载版本，包含一个 <code>Charset</code> 参数来存储文件的 Unicode 编码。</p><p><code>Files.write()</code> 被重载以写入 <code>byte</code> 数组或任何 <code>Iterable</code> 对象（它也有 <code>Charset</code> 选项）：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// files/Writing.java</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Writing</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> Random rand </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Random</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">47</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> SIZE </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Write bytes to a file:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">[] bytes </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">byte</span><span style="color:#E1E4E8;">[SIZE];</span></span>
<span class="line"><span style="color:#E1E4E8;">        rand.</span><span style="color:#B392F0;">nextBytes</span><span style="color:#E1E4E8;">(bytes);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">write</span><span style="color:#E1E4E8;">(Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;bytes.dat&quot;</span><span style="color:#E1E4E8;">), bytes);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;bytes.dat: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> Files.</span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">(Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;bytes.dat&quot;</span><span style="color:#E1E4E8;">)));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Write an iterable to a file:</span></span>
<span class="line"><span style="color:#E1E4E8;">        List&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; lines </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Files.</span><span style="color:#B392F0;">readAllLines</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;../streams/Cheese.dat&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">write</span><span style="color:#E1E4E8;">(Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Cheese.txt&quot;</span><span style="color:#E1E4E8;">), lines);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Cheese.txt: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> Files.</span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">(Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Cheese.txt&quot;</span><span style="color:#E1E4E8;">)));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">/* Output:</span></span>
<span class="line"><span style="color:#6A737D;">bytes.dat: 1000</span></span>
<span class="line"><span style="color:#6A737D;">Cheese.txt: 199</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// files/Writing.java</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Writing</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> Random rand </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Random</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">47</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> SIZE </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Write bytes to a file:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">[] bytes </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">byte</span><span style="color:#24292E;">[SIZE];</span></span>
<span class="line"><span style="color:#24292E;">        rand.</span><span style="color:#6F42C1;">nextBytes</span><span style="color:#24292E;">(bytes);</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">write</span><span style="color:#24292E;">(Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;bytes.dat&quot;</span><span style="color:#24292E;">), bytes);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;bytes.dat: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> Files.</span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">(Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;bytes.dat&quot;</span><span style="color:#24292E;">)));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Write an iterable to a file:</span></span>
<span class="line"><span style="color:#24292E;">        List&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; lines </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Files.</span><span style="color:#6F42C1;">readAllLines</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;../streams/Cheese.dat&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">write</span><span style="color:#24292E;">(Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Cheese.txt&quot;</span><span style="color:#24292E;">), lines);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Cheese.txt: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> Files.</span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">(Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Cheese.txt&quot;</span><span style="color:#24292E;">)));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">/* Output:</span></span>
<span class="line"><span style="color:#6A737D;">bytes.dat: 1000</span></span>
<span class="line"><span style="color:#6A737D;">Cheese.txt: 199</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><p>我们使用 <code>Random</code> 来创建一个随机的 <code>byte</code> 数组; 你可以看到生成的文件大小是 1000。</p><p>一个 <code>List</code> 被写入文件，任何 <code>Iterable</code> 对象也可以这么做。</p><p>如果文件大小有问题怎么办？ 比如说：</p><ol><li><p>文件太大，如果你一次性读完整个文件，你可能会耗尽内存。</p></li><li><p>您只需要在文件的中途工作以获得所需的结果，因此读取整个文件会浪费时间。</p></li></ol><p><code>Files.lines()</code> 方便地将文件转换为行的 <code>Stream</code>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// files/ReadLineStream.java</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ReadLineStream</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Files.</span><span style="color:#B392F0;">lines</span><span style="color:#E1E4E8;">(Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;PathInfo.java&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">skip</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">13</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">findFirst</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">          .</span><span style="color:#B392F0;">ifPresent</span><span style="color:#E1E4E8;">(System.out</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">println);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">/* Output:</span></span>
<span class="line"><span style="color:#6A737D;">    show(&quot;RegularFile&quot;, Files.isRegularFile(p));</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// files/ReadLineStream.java</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReadLineStream</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">        Files.</span><span style="color:#6F42C1;">lines</span><span style="color:#24292E;">(Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;PathInfo.java&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">skip</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">13</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">findFirst</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">          .</span><span style="color:#6F42C1;">ifPresent</span><span style="color:#24292E;">(System.out</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">println);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">/* Output:</span></span>
<span class="line"><span style="color:#6A737D;">    show(&quot;RegularFile&quot;, Files.isRegularFile(p));</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><p>这对本章中第一个示例代码做了流式处理，跳过 13 行，然后选择下一行并将其打印出来。</p><p><code>Files.lines()</code> 对于把文件处理行的传入流时非常有用，但是如果你想在 <code>Stream</code> 中读取，处理或写入怎么办？这就需要稍微复杂的代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// files/StreamInAndOut.java</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.io.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.nio.file.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.stream.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StreamInAndOut</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          Stream&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; input </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">            Files.</span><span style="color:#B392F0;">lines</span><span style="color:#E1E4E8;">(Paths.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;StreamInAndOut.java&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">          PrintWriter output </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PrintWriter</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;StreamInAndOut.txt&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            input.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(String</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">toUpperCase)</span></span>
<span class="line"><span style="color:#E1E4E8;">              .</span><span style="color:#B392F0;">forEachOrdered</span><span style="color:#E1E4E8;">(output</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">println);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;">(Exception </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RuntimeException</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// files/StreamInAndOut.java</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.io.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.nio.file.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.stream.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StreamInAndOut</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          Stream&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; input </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">            Files.</span><span style="color:#6F42C1;">lines</span><span style="color:#24292E;">(Paths.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;StreamInAndOut.java&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">          PrintWriter output </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PrintWriter</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;StreamInAndOut.txt&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        ) {</span></span>
<span class="line"><span style="color:#24292E;">            input.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(String</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">toUpperCase)</span></span>
<span class="line"><span style="color:#24292E;">              .</span><span style="color:#6F42C1;">forEachOrdered</span><span style="color:#24292E;">(output</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">println);</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;">(Exception </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RuntimeException</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>因为我们在同一个块中执行所有操作，所以这两个文件都可以在相同的 try-with-resources 语句中打开。<code>PrintWriter</code> 是一个旧式的 <code>java.io</code> 类，允许你“打印”到一个文件，所以它是这个应用的理想选择。如果你看一下 <code>StreamInAndOut.txt</code>，你会发现它里面的内容确实是大写的。</p><h2 id="本章小结" tabindex="-1">本章小结 <a class="header-anchor" href="#本章小结" aria-label="Permalink to &quot;本章小结&quot;">​</a></h2><p>虽然本章对文件和目录操作做了相当全面的介绍，但是仍然有没被介绍的类库中的功能——一定要研究 <code>java.nio.file</code> 的 Javadocs，尤其是 <code>java.nio.file.Files</code> 这个类。</p><p>Java 7 和 8 对于处理文件和目录的类库做了大量改进。如果您刚刚开始使用 Java，那么您很幸运。在过去，它令人非常不愉快，我确信 Java 设计者以前对于文件操作不够重视才没做简化。对于初学者来说这是一件很棒的事，对于教学者来说也一样。我不明白为什么花了这么长时间来解决这个明显的问题，但不管怎么说它被解决了，我很高兴。使用文件现在很简单，甚至很有趣，这是你以前永远想不到的。</p>`,79),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const A=s(p,[["render",t]]);export{D as __pageData,A as default};
