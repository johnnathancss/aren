/**
* demo.js
* http://www.codrops.com
*
* Licensed under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 
* Copyright 2019, Codrops
* http://www.codrops.com
*/

class HoverImgFx6 {
    constructor(el) {
        this.DOM = {el: el};
        
        this.DOM.reveal = document.createElement('div');
        this.DOM.reveal.className = 'hover-reveal';
        this.DOM.reveal.style.overflow = 'hidden';
        this.DOM.reveal.innerHTML = `<div class="hover-reveal__deco"></div><div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
        this.DOM.el.appendChild(this.DOM.reveal);
        this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
        this.DOM.revealInner.style.overflow = 'hidden';
        this.DOM.revealDeco = this.DOM.reveal.querySelector('.hover-reveal__deco');
        this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');

        this.initEvents();
    }
    initEvents() {
        this.positionElement = (ev) => {
            const mousePos = getMousePos(ev);
            const docScrolls = {
                left : document.body.scrollLeft + document.documentElement.scrollLeft, 
                top : document.body.scrollTop + document.documentElement.scrollTop
            };
            this.DOM.reveal.style.top = `${mousePos.y+20-docScrolls.top}px`;
            this.DOM.reveal.style.left = `${mousePos.x+20-docScrolls.left}px`;
        };
        this.mouseenterFn = (ev) => {
            this.positionElement(ev);
            this.showImage();
        };
        this.mousemoveFn = ev => requestAnimationFrame(() => {
            this.positionElement(ev);
        });
        this.mouseleaveFn = () => {
            this.hideImage();
        };
        
        this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
        this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
        this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
    }
    showImage() {
        TweenMax.killTweensOf(this.DOM.reveal);
        TweenMax.killTweensOf(this.DOM.revealInner);
        TweenMax.killTweensOf(this.DOM.revealImg);
        TweenMax.killTweensOf(this.DOM.revealDeco);

        this.tl = new TimelineMax({
            onStart: () => {
                this.DOM.reveal.style.opacity = 1;
                TweenMax.set(this.DOM.el, {zIndex: 1000});
            }
        })
        .add('begin')
        .set(this.DOM.revealInner, {x: '100%'})
        .set(this.DOM.revealDeco, {transformOrigin: '100% 50%'})
        .add(new TweenMax(this.DOM.revealDeco, 0.3, {
            ease: Sine.easeInOut,
            startAt: {scaleX: 0},
            scaleX: 1
        }), 'begin')
        .set(this.DOM.revealDeco, {transformOrigin: '0% 50%'})
        .add(new TweenMax(this.DOM.revealDeco, 0.6, {
            ease: Expo.easeOut,
            scaleX: 0
        }), 'begin+=0.3')
        .add(new TweenMax(this.DOM.revealInner, 0.6, {
            ease: Expo.easeOut,
            startAt: {x: '100%'},
            x: '0%'
        }), 'begin+=0.45')
        .add(new TweenMax(this.DOM.revealImg, 0.6, {
            ease: Expo.easeOut,
            startAt: {x: '-100%'},
            x: '0%'
        }), 'begin+=0.45')
        .add(new TweenMax(this.DOM.revealImg, 1.6, {
            ease: Expo.easeOut,
            startAt: {scale: 1.3},
            scale: 1
        }), 'begin+=0.45')
        .add(new TweenMax(this.DOM.reveal, 0.8, {
            ease: Quint.easeOut,
            startAt: {x: '20%', rotation: 10},
            x: '0%',
            rotation: 0
        }), 'begin');
    }
    hideImage() {
        TweenMax.killTweensOf(this.DOM.reveal);
        TweenMax.killTweensOf(this.DOM.revealInner);
        TweenMax.killTweensOf(this.DOM.revealImg);
        TweenMax.killTweensOf(this.DOM.revealDeco);

        this.tl = new TimelineMax({
            onStart: () => {
                TweenMax.set(this.DOM.el, {zIndex: 999});
            },
            onComplete: () => {
                TweenMax.set(this.DOM.el, {zIndex: ''});
                TweenMax.set(this.DOM.reveal, {opacity: 0});
            }
        })
        .add('begin')
        .add(new TweenMax(this.DOM.revealInner, 0.1, {
            ease: Sine.easeOut,
            x: '-100%'
        }), 'begin')
        .add(new TweenMax(this.DOM.revealImg, 0.1, {
            ease: Sine.easeOut,
            x: '100%'
        }), 'begin')
    }
}