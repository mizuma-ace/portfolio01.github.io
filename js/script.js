(function () {
    const kirakira = document.querySelectorAll('.gradation');

    let targetScroll = 0;
    let current = 0;
    const ease = 0.1;
    const speed = 0.2;
    let rafId = null;

    const maxShift = 5000; // ここ調整（px）復習する
    const translateY = -Math.min(current * speed, maxShift);

    window.addEventListener('scroll', () => {
        targetScroll = window.scrollY || window.pageYOffset;
    }, {
        passive: true
    });

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function update() {

        current = lerp(current, targetScroll, ease);

        const translateY = (current * speed) * -1;

        const y = `${translateY}px`;
        //疑似要素に効いている↓ 復習する
        kirakira.forEach((el) => {
            el.style.setProperty("--ky", y);
        });

        rafId = requestAnimationFrame(update);
    }

    rafId = requestAnimationFrame(update);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        } else {
            if (!rafId) rafId = requestAnimationFrame(update);
        }
    });
})();

// ハンバーガーメニュー
const span = document.querySelector(".left");
const el = document.querySelectorAll(".left span");
const slideMenu = document.querySelector("header nav ul");
const left = document.querySelectorAll("nav ul li");

span.addEventListener("click", () => {
  span.classList.toggle("open");
  if (span.classList.contains("open")) {
    slideMenu.animate(
      {
        transform: "translateX(0)",
        opacity: 1,
      },
      {
        duration: 300,
        fill: "forwards",
      }
    );
    left.forEach((element, index) => {
      element.animate(
        [
          {
            transform: "translateX(100%)",
            opacity: 0,
          },
          {
            transform: "translateX(0)",
            opacity: 1,
          },
        ],
        {
            delay: 250 * index,
          duration: 300,
          fill: "both"
        }
      );
    });
  } else {
    slideMenu.animate(
      {
        transform: "translateX(100vw)",
      },
      {
        duration: 300,
        fill: "forwards",
      }
    );
  }
});


// スクロールしたらふわっと現れる
const huwas = document.querySelectorAll('.huwa')

const visible = (entries) => {
    const keyframes = {
        opacity: [0, 1],
        translateY: ['200px', 0]
    };
    const time = {
        duration: 800,
        delay: 800,
        fill: 'both'
    }
    entries.forEach((entry) => {
        // ↓復習する
        if (!entry.isIntersecting) return;

        entry.target.animate(keyframes, time);
        observer.unobserve(entry.target);
    });
};

const observer = new IntersectionObserver(visible);
huwas.forEach((element) => {
    observer.observe(element)
});

//文字の色の切り替え//
const right = document.querySelectorAll(".social .sns");
let color = () => {
    let scroll = window.scrollY;
    right.forEach((r) => {
        if (scroll > 600) {
            r.classList.add('kirikae')
        } else {
            r.classList.remove('kirikae')
        }

    });
};
//↓スクロールするたびに判定 復習する
window.addEventListener("scroll", color, {
    passive: true
});
color();


//COMPORSER PAGE

//audio再生・ボタン切り替え//
let repeatBtns = document.querySelectorAll(".repeat");
let gifBtns = document.querySelectorAll(".gif");
let audios = document.querySelectorAll("audio");

repeatBtns.forEach((repeatBtn, i) => {
    let gifBtn = gifBtns[i];
    let audio = audios[i];

    const music = (isPlay) => {
        if (isPlay) {
            audio.play();
            repeatBtn.classList.add("hidden");
            gifBtn.classList.remove("hidden");
        } else {
            audio.pause();
            repeatBtn.classList.remove("hidden");
            gifBtn.classList.add("hidden");
        }
    };

    repeatBtn.addEventListener("click", () => {
        music(true);
    });

    // gifクリック → 停止（aタグ遷移を止める) 復習する
    gifBtn.addEventListener("click", (e) => {
        if (e.target.closest("a")) e.preventDefault();
        music(false);
    });

    // 初期状態（停止にしてrepeat表示）
    music(false);

});

//曲hoverしたときに画像にshadowかかる
let playlist = document.querySelectorAll(".playlist li");
let rings = document.querySelectorAll(".ring img");

playlist.forEach((pl, i) => {
    pl.addEventListener("mouseover", () => {
        playlist.forEach((li) => li.classList.remove("mouse"));
        pl.classList.add("mouse");

        rings.forEach((img) => img.classList.remove("shadow"));
        if (rings[i]) rings[i].classList.add("shadow");
    });
    pl.addEventListener("mouseout", () => {
        pl.classList.remove("mouse");
        if (rings[i]) rings[i].classList.remove("shadow");
    });
});


// COLLECTION PAGE//

//タブの切り替え//
let tabs = document.querySelectorAll('.comporserContent');
let contents = document.querySelectorAll('.commun');

tabs.forEach((element) => {
    element.addEventListener('click', () => {
        tabs.forEach((Element) => {
            Element.classList.remove('active');
        });
        element.classList.add('active');
        contents.forEach((content) => {
            content.classList.remove('active')
        });
        let target = document.getElementById(element.dataset.tab);
        target.classList.add('active');
    });
});

//TOPへ戻る//
const backbutton = document.querySelector(".backbutton");
let reverse = () => {
    let scroll = window.scrollY;
    if (scroll > 800) {
        backbutton.classList.add('look')
    } else {
        backbutton.classList.remove('look')
    }
};
//↓スクロールするたびに判定 復習する
window.addEventListener("scroll", reverse, {
    passive: true
});
reverse();


//名前変わる//
// let names = document.querySelectorAll('.comporserContent')

// names.addEventListener('click', () => {
//   names.forEach((name) => {
//     if (name == )
//   });
// });

let title = document.querySelector('h2');
let items = document.querySelectorAll('.comporserContent');

let names = ["- Mozart -", "- Beethoven -", "- Chopin -", "- Tchaikovsky -"];

items.forEach((item, i) => {
    item.addEventListener("click", () => {
        title.textContent = names[i] ?? "";
    });
});


// 画像ギャラリー
const hidari = document.querySelectorAll('.hidari img')
const imgs = document.querySelectorAll('.sankou img')
// const defaultSrc = hidari[0].src;

imgs.forEach((img) => {
    img.addEventListener('mouseover', (event) => {
        hidari.forEach((hi) => {
            hi.src = event.target.src;
            hi.animate({
                opacity: [0, 1]
            }, 500)
        });

    });
    // img.addEventListener("mouseout", (event) => {
    //     hidari.forEach((hi) => {
    //         hi.src = hidari[0].src;
    //         hi.animate({
    //             opacity: [1, 0]
    //         }, 300)
    //     });
    // });

});



// CONTACT PAGE //

//タブの切り替え//
let tabss = document.querySelectorAll('.tab h2');
let contentss = document.querySelectorAll('.content');

tabss.forEach((element) => {
    element.addEventListener('click', () => {
        tabss.forEach((Element) => {
            Element.classList.remove('active');
        });
        element.classList.add('active');
        contentss.forEach((content) => {
            content.classList.remove('active')
        });
        let target = document.getElementById(element.dataset.tab);
        target.classList.add('active');
    });
});