import{_ as a,o as e,c as o,Q as p}from"./chunks/framework.c3fbb961.js";const d=JSON.parse('{"title":"附录:C++和Java的优良传统","description":"","frontmatter":{},"headers":[],"relativePath":"book/Appendix-The-Positive-Legacy-of-C-plus-plus-and-Java.md","filePath":"book/Appendix-The-Positive-Legacy-of-C-plus-plus-and-Java.md"}'),t={name:"book/Appendix-The-Positive-Legacy-of-C-plus-plus-and-Java.md"},i=p('<p>[TOC]</p><h1 id="附录-c-和java的优良传统" tabindex="-1">附录:C++和Java的优良传统 <a class="header-anchor" href="#附录-c-和java的优良传统" aria-label="Permalink to &quot;附录:C++和Java的优良传统&quot;">​</a></h1><blockquote><p>在各种讨论声中，有一些人认为C++是一种设计糟糕的语言。 我认为理解C++和Java语言的选择有助于了解更大的视角。</p></blockquote><p>也就是说，我几乎不再使用C++了。当我使用它的时候，要么是用来检查遗留代码，要么是编写性能关键（performance-critical）部分，程序通常尽可能小，以便用其他语言编写的其他程序来调用。</p><p>因为我在最初的8年里一直在C++标准委员会工作，所以我见证了那些被做出的决定。它们都经过了极其谨慎的考虑，远远超过了许多在Java中做出的决定。</p><p>然而，正如人们正确地指出的那样，由此产生的语言使用起来既复杂又痛苦，而且只要我一段时间不使用它，我就会忘记那些古怪的规则。在我写书的时候，我是从第一原理（first principles）处了解这些规则的，而不是记住了它们。</p><p>为了理解C++语言为何既令人不愉快且复杂，同时又是精心设计的，必须要牢记C++中所有内容的主要设计决策：与C. Bjarne Stroustrup（该语言的创造者，即“C++之父”）的兼容性决定。这样的设计似乎是为了可以让大量的C程序员透明地转移到对象（代指C++）上：允许他们在C++下编译他们的C代码。这是一个巨大的限制，一直是C++最大的优势......而且也是它的祸根。这就是使得C++成功的原因，也是使它复杂的原因。</p><p>它也欺骗了那些不太了解C++的Java设计师。例如，他们认为运算符重载对于程序员来说很难正确使用。这在C++中基本上是正确的，因为C++既有栈分配又有堆分配，你必须重载运算符来处理所有情况而且不要造成内存泄漏。这确实很困难。然而，Java有单一的内存分配机制和一个垃圾收集器，这使得运算符重载变得微不足道，正如C＃中那样（但在早于Java的Python中已经可以看到）。但多年来，来自Java团队的一贯态度是“运算符重载太复杂了”。这里还有许多决策，所做的事明显不应该是他们做的。正是由于这些原因，让我有了蔑视Gosling（即“Java之父”）和Java团队决策的名声。（Java 7和8由于某种原因包含了更好的决策。但是向后兼容性这个约束总是会阻碍真正的改进。语言永远不会是它本来的样子。）</p><p>还有很多其他的例子。“为了提高效率，必须包含基本类型”；坚持“万物皆对象”是正确的；当对性能有要求的时候，提供一个陷阱门（trap door）来做低级别的活动（lower-level activities）（这里也可以使用hotspot技术透明地提高性能，正如他们最终做的那样）；不能直接使用浮点处理器去计算超越函数，它用软件来完成。我已经尽可能多地提出了这样的问题，但我得到的却一直是类似“这是Java方式”这样的回复。</p><p>当我提出关于泛型的设计有多糟糕的时候，我得到了相同的回复，以及“我们必须向后兼容那样以前用Java做出的决策”（即使它们是糟糕的决策）。最近越来越多的人已经获得了足够的泛型经验，可以发现泛型真的很难用。事实上，C++模板更强大、更一致（现在更容易使用，因为编译器的错误消息是可以容忍的）。人们一直在认真对待物化（reification），这可能是有用的东西，但是在那种被严格约束所削弱的设计中并没有多大影响。</p><p>这样的例子还有很多很多。这是否意味着Java失败了？绝对不。Java将程序员的主流带入了垃圾收集、虚拟机和一致的错误处理模型的世界。由于它的所有缺陷，它将我们提升到了一个水平，现在我们已经准备好使用更高级别的语言了。</p><p>有一点，C++是领先的语言，人们认为它总是如此。许多人对Java有同样的看法，但由于JVM，Java使得取代自己变得更加容易。现在有可能会有人创建一种新语言，并使其在短时间内像Java一样高效运行。以前，为新语言开发一个正确有效的编译器需要花费大部分开发时间。</p><p>这种情况已经发生了，包括像Scala这样的高级静态语言，以及动态语言，新的且可移植的，如Groovy，Clojure，JRuby和Jython。这是未来，并且过渡很顺畅，因为可以很轻易地将这些新语言与现有Java代码结合使用，并且必要时可以重写那些在Java中的瓶颈。</p><p>在撰写本文时，Java是世界上的头号编程语言。然而，Java最终将会减弱，就像C++一样，沦只在特殊情况下使用（或者只是用来支持传统的代码，因为它不能像C++那样和硬件连接）。但是无意中的好处，也是Java真正意外的光彩之处在于它为自己的替代品创造了一条非常畅通的道路，即使Java本身已经达到了无法再发展的程度。未来所有的语言都应该从中学习：要么创建一个可以重构的文化（像Python和Ruby做的那样），要么就让竞争者茁壮成长。</p>',14),s=[i];function v(r,n,c,C,J,l){return e(),o("div",null,s)}const u=a(t,[["render",v]]);export{d as __pageData,u as default};
