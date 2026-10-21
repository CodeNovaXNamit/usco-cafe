import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

const certificates = {
  "namit-bhardwaj": {
    name: "Namit Bhardwaj",
    image: "/cert/Namit Bhardwaj-with-qr.png",
  },
  "rajyavardhan-chauhan": {
    name: "Rajyavardhan Chauhan",
    image: "/cert/Rajyavardhan Chauhan-with-qr.png",
  },
} as const;

type CertificateSlug = keyof typeof certificates;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(certificates).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const certificate = certificates[slug as CertificateSlug];

  return {
    title: certificate ? `${certificate.name} · USCO Certificate` : "USCO Certificate",
    description: "USCO Collective project completion certificate.",
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const certificate = certificates[slug as CertificateSlug];

  if (!certificate) notFound();

  return (
    <main className={styles.page}>
      <div className={styles.frame}>
        <p className={styles.eyebrow}>USCO Collective · Project archive</p>
        <h1 className={styles.title}>{certificate.name}</h1>
        <p className={styles.note}>Certificate of project completion</p>
        <Image
          className={styles.certificate}
          src={certificate.image}
          alt={`USCO Collective project completion certificate for ${certificate.name}`}
          width={1536}
          height={1024}
          priority
        />
      </div>
    </main>
  );
}
