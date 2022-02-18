import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useEffect, useState} from "react";
import useMeasure from 'react-use-measure'
import { useSpring, useTrail, animated, config } from '@react-spring/web'
import {
  useWindowSize,
} from '@react-hook/window-size/throttled'
import { GTM_ID } from '../lib/gtm'
// import runAnime from '../assets/animate'
const fast = { tension: 1200, friction: 40 }
const slow = { mass: 10, tension: 200, friction: 50 }
const trans = (x: number, y: number) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`

const Home: NextPage = () => {
  const [width, height] = useWindowSize({ fps: 30 });
  const [flip, set] = useState(false)

  const [trail, api] = useTrail(3, i => ({
    xy: [width * 0.55, height * 0.15],
    config: i === 0 ? fast : slow,
  }))
  const [ref, { left, top }] = useMeasure()
  const handleMouseMove = e => {
    api.start({ xy: [e.clientX - left, e.clientY - top] })
  }

  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 100,
    config: config.molasses,
    onRest: () => set(!flip),
  })
  
  return (
    <div className={styles.container}>
      <Head>
        <title>davidmood.eth</title>
        <meta name="description" content="This is Davidmood.eth. I Design, Develope, Sing and Code." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      
      <main className={styles.main}>
      
      <div className="z-10">

        <animated.h1 className={styles.title} style={props}>davidmood.eth</animated.h1>
        <p className={styles.description}>
          <code className={styles.code}>Starman Waiting in the Sky. Here for a mug of tea!</code>
        </p>

        <div className={styles.grid} >
          <a href="#" 
            rel="noreferrer"
            target={'_blank'}
            className={styles.card}
          >
            <h2>Story & Career &rarr;</h2>
            <p>Practitioner of Typescript, Nodejs, React, ReactNative and Vue. Blockchain programming enthusiast & a learning gopher.</p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Education &rarr;</h2>
            <p>Blockchain programming enthusiast & a curious gopher! B.A. in English Literature. Self Studied Marketing Management.</p>
          </a>

          <a
            href="https://github.com/davoodmood"
            rel="noreferrer"
            target={'_blank'}
            className={styles.card}
          >
            <h2>Code &rarr;</h2>
            <p>Practitioner of Solidity, Typescript, Nodejs, React, ReactNative and Vue. Visit my Github, jog around over 12 opensource projects. </p>
          </a>

          <a
            href="https://soundcloud.com/electro_magnet"
            rel="noreferrer"
            target={'_blank'}
            className={styles.card}
          >
            <h2>Entertainment &rarr;</h2>
            <p>
              Lively with the music, painting and games. DC fan. Rock and Roll & Electronics. Listen to my music on SoundCloud. 
            </p>
          </a>
        </div>
      </div>
        
        <svg style={{ position: 'absolute', width: 0, height: 0 }} className={'z-0'}>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
            <feColorMatrix
              in="blur"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
            />
          </filter>
        </svg>
        <div ref={ref} className={styles.hooksMain} onMouseMove={handleMouseMove}>
          {trail.map((props, index) => (
            <animated.div key={index} style={{ transform: props.xy.to(trans) }} />
          ))}
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
      
    </div>
  )
}

export default Home
