import React from 'react';
import Head from 'next/head';
import styles from './resume.module.css';

const projects = [
  {
    title: 'Anheuser-Busch Brewery Tour',
    role: 'Lead Unity Engineer',
    company: 'Another Reality Studio',
    description: 'Guided AR brewery tour with branded moments and spatial storytelling for on-site visitors.',
    links: [
      { text: 'Project Page', url: 'https://constantine-peros.webflow.io/work/anheuser-busch' }
    ],
    image: '/resume/images/anheuserbusch.gif'
  },
  {
    title: 'PulseJet App: Joshua Tree Music Festival',
    role: 'Lead Unity Engineer',
    company: 'PulseJet',
    description: 'Immersive Quest experience featuring interactive artist content inside a stylized desert world.',
    links: [
      { text: 'Project Page', url: 'https://constantine-peros.webflow.io/work/joshua-tree-music-festival' },
      { text: 'Meta Quest Store', url: 'https://www.meta.com/experiences/joshua-tree-music-festival-2023/25234075122905388/#additional-contents' }
    ],
    image: '/resume/images/jtmf.png'
  },
  {
    title: 'EventShop',
    role: 'Lead Unity Engineer',
    company: 'Another Reality Studio',
    description: 'Mobile AR layer for event commerce and fan engagement with shareable activations.',
    links: [
      { text: 'Project Page', url: 'https://constantine-peros.webflow.io/work/eventshop' },
      { text: 'Website', url: 'https://www.eventshop.com/' },
      { text: 'Instagram', url: 'https://www.instagram.com/eventshopofficial/' }
    ],
    image: '/resume/images/eventshop.png'
  },
  {
    title: 'Expanded Existence',
    role: 'XR Engineer',
    company: 'Dynamic Augmented Solutions',
    description: 'Spatial visualization for operating-room planning and procedural context using mixed reality.',
    links: [
      { text: 'Project Page', url: 'https://constantine-peros.webflow.io/work/surgery' },
      { text: 'eXeX', url: 'https://exex.ai/' },
      { text: 'TIME', url: 'https://time.com/7094558/exex-experiencex/' }
    ],
    image: '/resume/images/experiencex.png',
    highlight: 'A TIME Magazine Best Invention 2024'
  },
  {
    title: 'Puttscape',
    role: 'XR Engineer',
    company: 'Dynamic Augmented Solutions',
    description: 'Space-themed AR mini-golf gameplay mapped onto real-world surfaces and play spaces.',
    links: [
      { text: 'Project Page', url: 'https://constantine-peros.webflow.io/work/puttscape' },
      { text: 'Website', url: 'https://www.puttscape.com/' }
    ],
    image: '/resume/images/puttscape.png'
  }
];

const ResumePage = () => {
  return (
    <>
      <Head>
        <title>Unity / XR Projects — Constantine Peros</title>
        <meta name="description" content="Selected shipped + client-facing Unity/XR builds by Constantine Peros." />
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.titleblock}>
            <h1>Unity / XR Projects</h1>
          </div>

          <div className={styles.contact}>
            <div><b>Constantine Peros</b></div>
            <div>
                <a href="https://constantine-peros.webflow.io/" target="_blank" rel="noreferrer">Portfolio </a>|
                <a href="https://github.com/cperos-xr/" target="_blank" rel="noreferrer"> GitHub </a>|
                <a href="https://www.youtube.com/@CPerosXR" target="_blank" rel="noreferrer"> YouTube </a> |
                <a href="https://www.linkedin.com/in/constantine-peros/" target="_blank" rel="noreferrer"> LinkedIn</a>
            </div>
            <div><a href="mailto:CPeros.XR@gmail.com">CPeros.XR@gmail.com</a> · 949-422-9297</div>
          </div>
        </header>

        <section className={styles.grid}>
          {projects.map((project, index) => (
            <article key={index} className={styles.card}>
              <div className={styles.thumb}>
                <img src={project.image} alt={`${project.title} thumbnail`} />
              </div>
              <div className={styles.body}>
                <h2 className={styles.projTitle}>{project.title}</h2>
                <p className={styles.meta}>{project.role} | {project.company}</p>
                <p className={styles.oneLine}>{project.description}</p>
                {project.highlight && <p className={styles.highlight}>{project.highlight}</p>}
                <div className={styles.links}>
                  <b>Links:</b>
                  {project.links.map((link, linkIndex) => (
                    <span key={linkIndex}>
                      <a href={link.url} target="_blank" rel="noreferrer">{link.text}</a>
                      {linkIndex < project.links.length - 1 && <span className={styles.linkSep}></span>}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {/* XR Engineering Focus Card */}
          <article className={`${styles.card} ${styles.focusCard}`}>
            <div className={styles.thumb}>
              <img src="/resume/images/cperos.png" alt="Constantine Peros working on a project" />
            </div>
            <div className={styles.body}>
              <h2 className={styles.projTitle}>XR Engineering Focus</h2>
              <p className={styles.focusText}>
                I design and ship production-ready Unity XR experiences across AR and VR, including branded activations, live events, mobile AR, and extended reality for entertainment, commercial, healthcare and enterprise use.
              </p>
              <p className={styles.focusText}>
                My work focuses on interaction design, technical execution, and delivering experiences that function reliably in real-world deployment contexts.
              </p>
              <div className={styles.qrRow}>
                <div className={styles.qrText}>

                  <div style={{ marginTop: '4px' }}>
                  </div>
                </div>
                <div className={styles.qrBox}>
                  <img src="/resume/images/qr-code.png" alt="QR code to about page" />
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* GitHub Link */}
        <footer className={styles.footer}>
          <div>All projects shown are shipped, production applications where Constantine Peros served as lead or core Unity engineer.</div>
        </footer>
      </div>
    </>
  );
};

export default ResumePage;