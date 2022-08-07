import React, { useEffect, useState } from "react";
import { DateFormatter } from "../DateFormatter";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import MainArticle from "./MainArticle";
import Article from "./Article";

const News = ({ post, index, filterSelected }: any) => {
  const even = index % 2 === 0;
  gsap.registerPlugin(ScrollTrigger);
  const [imageLoaded, setImageLoaded] = useState(false);
  const date = DateFormatter(post.createdAt);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (document.querySelector("#main-image")) {
      gsap.set("#main-image", {
        opacity: 0,
        x: 30,
      });
      gsap.set("#main-title", { opacity: 0, y: -20 });
      gsap.set("#main-subtitle", { opacity: 0, y: -20 });
      gsap.set("#main-date", { opacity: 0 });
    }
    if (even && document.querySelector(".trigger")) {
      gsap.set(".trigger", { opacity: 0, x: 50 });
    } else if (document.querySelector(".trigger")) {
      gsap.set(".trigger", { opacity: 0, x: -50 });
    }

    if (imageLoaded) {
      gsap
        .timeline({
          onStart: setAnimationComplete,
          onStartParams: [false],
          onComplete: setAnimationComplete,
          onCompleteParams: [true],
        })
        .to(
          "#main-title",
          { opacity: 1, y: 0, duration: 1, overwrite: true },
          0.7
        )
        .to("#main-subtitle", { opacity: 1, y: 0, overwrite: true }, 1)
        .to("#main-date", { opacity: 1, overwrite: true }, 1.3)
        .to(
          "#main-image",
          {
            opacity: 1,
            x: 0,
            duration: 2,
            ease: "power4.out",
            overwrite: true,
          },
          1.5
        );
    }
  }, [imageLoaded, filterSelected]); //eslint-disable-line

  useEffect(() => {
    gsap.utils.toArray(".trigger").forEach((title: any) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: title,
          start: "center: 90%",
          end: "+=100",
          toggleActions: "play none none none",
        },
      });

      tl.to(title, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power4.out",
        startAt: { x: -50 },
      });
    });
  }, []);

  if (index === 0) {
    return (
      <MainArticle
        post={post}
        index={index}
        setImageLoaded={setImageLoaded}
        animationComplete={animationComplete}
      />
    );
  } else {
    return <Article post={post} index={index} />;
  }
};

export default News;
