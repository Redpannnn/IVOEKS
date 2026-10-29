"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  Music,
  VolumeX,
  Gift,
  Send,
  ChevronDown,
  Instagram,
  ExternalLink,
  Copy,
  Check,
  Loader2,
  Download,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ⚙️ CONFIG: URL tujuan tombol "Back to Template" */
const TEMPLATE_URL = "https://template.memoraa-invitation.my.id/";

// ==================== DATA ====================
const WEDDING_DATA = {
  couple: {
    groom: {
      firstName: "Raka",
      fullName: "Raka Pratama, S.Kom.",
      parent: "Putra kedua dari Bapak H. Budi Pratama & Ibu Hj. Siti Nurhayati",
      instagram: "https://instagram.com/",
    },
    bride: {
      firstName: "Aulia",
      fullName: "Aulia Putri Ramadhani, S.Psi.",
      parent: "Putri kedua dari Bapak Ir. Suryanto & Ibu Dra. Rina Amelia",
      instagram: "https://instagram.com/",
    },
  },
  event: {
    date: new Date("2026-11-03T08:00:00+07:00"),
    dayName: "Selasa",
    dateStr: "3 November 2026",
    akad: {
      time: "08:00 - 10:00 WIB",
      venue: "Masjid Al-Ikhlas",
      address: "Jl. Kebahagiaan No. 1, Jakarta Selatan",
    },
    resepsi: {
      time: "11:00 - 14:00 WIB",
      venue: "Gedung Serba Guna",
      address: "Jl. Kebahagiaan No. 1, Jakarta Selatan",
    },
  },
  guest: {
    name: "M Rudi Iskandar",
  },
  accounts: [
    { bank: "Bank BCA", number: "1234567890", name: "Raka Pratama" },
    { bank: "Bank Mandiri", number: "0987654321", name: "Aulia Putri R" },
  ],
  story: [
    {
      date: "2020",
      title: "Pertama Bertemu",
      desc: "Kami pertama kali bertemu di acara seminar kampus. Senyummu yang hangat membuat hari itu terasa istimewa.",
    },
    {
      date: "2021",
      title: "Mulai Dekat",
      desc: "Obrolan ringan berubah menjadi percakapan yang tak pernah habis. Kami menemukan kenyamanan satu sama lain.",
    },
    {
      date: "2023",
      title: "Lamaran",
      desc: "Di bawah cahaya sunset yang indah, dengan hati berdebar, pertanyaan itu akhirnya terucap.",
    },
    {
      date: "2026",
      title: "Pernikahan",
      desc: "Hari yang kami tunggu akhirnya tiba. Kami siap melangkah bersama selamanya.",
    },
  ],
  gallery: [
    "/images/wedding/couple-photo.png",
    "/images/wedding/couple-silhouette.png",
    "/images/wedding/floral-bouquet.png",
    "/images/wedding/wedding-details.png",
    "/images/wedding/floral-frame.png",
  ],
};

// ==================== ANIMATION VARIANTS ====================
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

// ==================== SECTION DIVIDER ====================
function SectionDivider({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className={`h-px w-10 ${light ? "bg-white/30" : "bg-black/15"}`} />
      <span className="text-2xl text-black/40">&#10022;</span>
      <span className={`h-px w-10 ${light ? "bg-white/30" : "bg-black/15"}`} />
    </div>
  );
}

// ==================== SECTION LABEL ====================
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-10 bg-black/15" />
      <p className="section-label">{children}</p>
      <span className="h-px w-10 bg-black/15" />
    </div>
  );
}

// ==================== ANIMATED SECTION WRAPPER ====================
function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ==================== BACK TO TEMPLATE ====================
function BackToTemplateButton() {
  return (
    <a
      href={TEMPLATE_URL}
      aria-label="Kembali ke daftar template"
      className="fixed left-1/2 top-4 z-50 flex h-9 -translate-x-1/2 items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-4 text-xs font-medium tracking-wide text-black/60 shadow-md backdrop-blur-sm transition-all hover:border-[#8B6F47]/40 hover:bg-white hover:text-[#8B6F47] md:top-5"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      Back to Template
    </a>
  );
}

// ==================== COVER PAGE ====================
function CoverPage({ onOpen }: { onOpen: () => void }) {
  const getGuestName = (): string => {
    if (typeof window === "undefined") return WEDDING_DATA.guest.name;
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) {
      return decodeURIComponent(to).replace(/\+/g, " ");
    }
    return WEDDING_DATA.guest.name;
  };

  const [guestName] = useState(getGuestName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-warm-gradient">
      <div className="absolute inset-0 opacity-80 bg-radial-overlay" />

      {/* Decorative floral corners */}
      <div className="absolute top-0 left-0 w-40 h-40 opacity-20">
        <img
          src="/images/wedding/floral-bouquet.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40 opacity-20 rotate-180">
        <img
          src="/images/wedding/floral-bouquet.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-[560px] mx-auto px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="glass-card rounded-[34px] px-7 py-10 text-center">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            The Wedding Of
          </motion.p>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="heading-serif text-[42px] leading-[1.05] font-light">
              {WEDDING_DATA.couple.groom.firstName}
            </p>
            <p className="heading-serif text-[46px] leading-none text-black/70 my-1 font-light">
              &amp;
            </p>
            <p className="heading-serif text-[42px] leading-[1.05] font-light">
              {WEDDING_DATA.couple.bride.firstName}
            </p>
          </motion.div>

          <motion.div
            className="mt-6 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span className="h-px w-10 bg-black/20" />
            <p className="section-label text-black/65">
              {WEDDING_DATA.event.dayName}, {WEDDING_DATA.event.dateStr}
            </p>
            <span className="h-px w-10 bg-black/20" />
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="section-label text-black/60 mb-1">Kepada Yth.</p>
            <p className="heading-serif text-[26px] text-[#8B6F47] font-medium">
              {guestName}
            </p>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <button
              onClick={onOpen}
              className="group relative w-full overflow-hidden rounded-full bg-[#111827] text-white py-[14px] px-8 text-sm font-normal transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 tracking-[0.22em] uppercase text-[12px]">
                Buka Undangan
                <span className="inline-block translate-y-[1px] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
            </button>
            <p className="mt-3 text-[11px] text-black/50">
              Ketuk untuk membuka undangan
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.8 }}
        >
          <div className="rounded-full border border-black/10 bg-white/70 px-4 py-2">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-black/50" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ==================== MUSIC PLAYER ====================
function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3"
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-white/70 border border-black/10 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      aria-label="Toggle music"
    >
      {isPlaying ? (
        <Music className="w-4 h-4 text-[#8B6F47]" />
      ) : (
        <VolumeX className="w-4 h-4 text-black/40" />
      )}
    </button>
  );
}

// ==================== BLESSING SECTION ====================
function BlessingSection() {
  return (
    <AnimatedSection className="relative w-full py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-warm-gradient" />
      <div className="absolute inset-0 opacity-85 bg-radial-overlay" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.06),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-[560px]">
        <div className="relative overflow-hidden glass-card rounded-[34px] px-7 py-10 text-center">
          <div className="pointer-events-none absolute inset-0 opacity-18 inner-shadow-overlay" />

          <motion.div variants={fadeInUp} className="relative">
            <SectionLabel>Blessing</SectionLabel>
            <p className="heading-serif mt-6 text-[32px] sm:text-[36px] leading-[1.12] font-light">
              Endless Love
            </p>
          </motion.div>

          <motion.div variants={fadeIn}>
            <SectionDivider />
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-5 text-[13px] leading-7 text-black/70 font-light"
          >
            Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
            pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
            dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
            kasih dan sayang. Sungguh, pada yang demikian itu benar-benar
            terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
          </motion.p>

          <motion.div variants={fadeIn} className="mt-7 flex items-center justify-center">
            <span className="h-px w-10 bg-black/15" />
            <p className="mx-4 text-[11px] tracking-[0.24em] uppercase text-black/55">
              (QS. Ar-Rum: 21)
            </p>
            <span className="h-px w-10 bg-black/15" />
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// ==================== COUPLE SECTION ====================
function CoupleSection() {
  return (
    <AnimatedSection className="relative w-full py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-warm-gradient" />
      <div className="absolute inset-0 opacity-80 bg-radial-overlay" />

      <div className="relative mx-auto w-full max-w-[560px]">
        <motion.div variants={fadeInUp} className="text-center">
          <SectionLabel>Bride &amp; Groom</SectionLabel>
          <p className="heading-serif mt-6 text-[32px] sm:text-[36px] leading-[1.1] font-light">
            Meet the Happy Couple
          </p>
          <p className="mt-3 text-[13px] text-[#4B5563] font-light">
            Dengan penuh cinta, kami memperkenalkan diri.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="mt-10 flex flex-col gap-9">
          {/* Groom Card */}
          <motion.div variants={fadeInUp} className="relative w-full glass-card-strong rounded-[30px] px-7 py-9 text-center">
            <div className="pointer-events-none absolute inset-0 opacity-18 inner-shadow-overlay" />
            <div className="relative">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-[#8B6F47]/20 mb-4">
                <img
                  src="/images/wedding/couple-photo.png"
                  alt="Raka"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="heading-serif text-[34px] sm:text-[38px] leading-[1.05] font-light">
                {WEDDING_DATA.couple.groom.firstName}
              </p>
              <p className="mt-3 text-[14px] text-[#374151]">
                {WEDDING_DATA.couple.groom.fullName}
              </p>
              <p className="mt-4 text-[13px] leading-6 text-[#4B5563] font-light">
                {WEDDING_DATA.couple.groom.parent}
              </p>
              <div className="mt-6 flex justify-center">
                <a
                  target="_blank"
                  href={WEDDING_DATA.couple.groom.instagram}
                  className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 shadow-sm transition hover:scale-[1.04]"
                >
                  <Instagram className="w-4 h-4 text-[#1F2937]" />
                  <span className="text-[11px] tracking-[0.22em] uppercase text-[#1F2937]/70">
                    Instagram
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Ampersand */}
          <motion.div variants={fadeIn} className="flex justify-center">
            <p className="heading-serif text-[60px] sm:text-[72px] leading-none text-black/70 font-light">
              &amp;
            </p>
          </motion.div>

          {/* Bride Card */}
          <motion.div variants={fadeInUp} className="relative w-full glass-card-strong rounded-[30px] px-7 py-9 text-center">
            <div className="pointer-events-none absolute inset-0 opacity-18 inner-shadow-overlay" />
            <div className="relative">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-[#8B6F47]/20 mb-4">
                <img
                  src="/images/wedding/couple-silhouette.png"
                  alt="Aulia"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="heading-serif text-[34px] sm:text-[38px] leading-[1.05] font-light">
                {WEDDING_DATA.couple.bride.firstName}
              </p>
              <p className="mt-3 text-[14px] text-[#374151]">
                {WEDDING_DATA.couple.bride.fullName}
              </p>
              <p className="mt-4 text-[13px] leading-6 text-[#4B5563] font-light">
                {WEDDING_DATA.couple.bride.parent}
              </p>
              <div className="mt-6 flex justify-center">
                <a
                  target="_blank"
                  href={WEDDING_DATA.couple.bride.instagram}
                  className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 shadow-sm transition hover:scale-[1.04]"
                >
                  <Instagram className="w-4 h-4 text-[#1F2937]" />
                  <span className="text-[11px] tracking-[0.22em] uppercase text-[#1F2937]/70">
                    Instagram
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ==================== EVENT SECTION ====================
function EventSection() {
  return (
    <AnimatedSection id="event" className="relative w-full py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-warm-gradient" />
      <div className="absolute inset-0 opacity-85 bg-radial-overlay" />

      <div className="relative mx-auto w-full max-w-[560px]">
        <motion.div variants={fadeInUp} className="text-center">
          <SectionLabel>Event</SectionLabel>
          <p className="heading-serif mt-6 text-[32px] sm:text-[36px] leading-[1.12] font-light">
            Save the Date
          </p>
          <SectionDivider />
        </motion.div>

        <motion.div variants={staggerContainer} className="mt-10 flex flex-col gap-6">
          {/* Akad Nikah */}
          <motion.div variants={fadeInUp} className="glass-card rounded-[24px] p-7 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#8B6F47]/10 mb-4">
              <Heart className="w-6 h-6 text-[#8B6F47]" />
            </div>
            <p className="heading-serif text-[26px] font-light">Akad Nikah</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-[13px] text-black/70">
                <Calendar className="w-4 h-4 text-[#8B6F47]" />
                <span>{WEDDING_DATA.event.dayName}, {WEDDING_DATA.event.dateStr}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[13px] text-black/70">
                <Clock className="w-4 h-4 text-[#8B6F47]" />
                <span>{WEDDING_DATA.event.akad.time}</span>
              </div>
              <div className="flex items-start justify-center gap-2 text-[13px] text-black/70">
                <MapPin className="w-4 h-4 text-[#8B6F47] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">{WEDDING_DATA.event.akad.venue}</p>
                  <p className="text-black/50 text-[12px]">{WEDDING_DATA.event.akad.address}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Resepsi */}
          <motion.div variants={fadeInUp} className="glass-card rounded-[24px] p-7 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#8B6F47]/10 mb-4">
              <Heart className="w-6 h-6 text-[#8B6F47]" />
            </div>
            <p className="heading-serif text-[26px] font-light">Resepsi</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-[13px] text-black/70">
                <Calendar className="w-4 h-4 text-[#8B6F47]" />
                <span>{WEDDING_DATA.event.dayName}, {WEDDING_DATA.event.dateStr}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[13px] text-black/70">
                <Clock className="w-4 h-4 text-[#8B6F47]" />
                <span>{WEDDING_DATA.event.resepsi.time}</span>
              </div>
              <div className="flex items-start justify-center gap-2 text-[13px] text-black/70">
                <MapPin className="w-4 h-4 text-[#8B6F47] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">{WEDDING_DATA.event.resepsi.venue}</p>
                  <p className="text-black/50 text-[12px]">{WEDDING_DATA.event.resepsi.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Google Maps Button */}
        <motion.div variants={fadeInUp} className="mt-6 text-center">
          <a
            href="https://maps.google.com/?q=Jakarta+Selatan"
            target="_blank"
            className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-5 py-3 shadow-sm transition hover:scale-[1.04] text-[13px] text-black/70"
          >
            <MapPin className="w-4 h-4 text-[#8B6F47]" />
            Lihat Lokasi di Google Maps
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ==================== COUNTDOWN SECTION ====================
function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = WEDDING_DATA.event.date.getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Menit" },
    { value: timeLeft.seconds, label: "Detik" },
  ];

  return (
    <AnimatedSection className="relative w-full py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-warm-gradient" />
      <div className="absolute inset-0 opacity-85 bg-radial-overlay" />

      <div className="relative mx-auto w-full max-w-[560px]">
        <motion.div variants={fadeInUp} className="text-center">
          <SectionLabel>Countdown</SectionLabel>
          <p className="heading-serif mt-6 text-[32px] sm:text-[34px] leading-[1.12] font-light">
            Menghitung Hari
          </p>
          <SectionDivider />
        </motion.div>

        <motion.div
          variants={scaleIn}
          className="mt-10 relative overflow-hidden glass-card rounded-[34px] px-6 py-8"
        >
          <div className="pointer-events-none absolute inset-0 opacity-18 inner-shadow-overlay" />
          <div className="relative grid grid-cols-4 gap-2 sm:gap-3">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="rounded-2xl border border-black/10 bg-white/70 px-3 py-4 text-center shadow-sm"
              >
                <p className="heading-serif text-[28px] sm:text-[34px] leading-none font-light">
                  {String(unit.value).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-black/55">
                  {unit.label}
                </p>
              </div>
            ))}
          </div>

          <div className="relative mt-7 text-center">
            <p className="text-[13px] leading-7 text-black/70 font-light">
              Merupakan kebahagiaan dan kehormatan bagi kami, jika Anda berkenan
              hadir dan memberikan restu kepada kami.
            </p>
            <p className="heading-serif mt-5 text-[24px] sm:text-[26px] font-light">
              {WEDDING_DATA.couple.groom.firstName}{" "}
              <span className="text-[28px] sm:text-[30px] text-black/75">&amp;</span>{" "}
              {WEDDING_DATA.couple.bride.firstName}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ==================== LOVE STORY SECTION ====================
function LoveStorySection() {
  return (
    <AnimatedSection className="relative w-full py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-warm-gradient" />
      <div className="absolute inset-0 opacity-80 bg-radial-overlay" />

      <div className="relative mx-auto w-full max-w-[560px]">
        <motion.div variants={fadeInUp} className="text-center">
          <SectionLabel>Our Story</SectionLabel>
          <p className="heading-serif mt-6 text-[32px] sm:text-[36px] leading-[1.12] font-light">
            Cerita Cinta Kami
          </p>
          <SectionDivider />
        </motion.div>

        <motion.div variants={staggerContainer} className="mt-10 relative">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-[#8B6F47]/20 -translate-x-1/2" />

          {WEDDING_DATA.story.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`relative flex gap-6 mb-10 last:mb-0 ${
                index % 2 === 0 ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 sm:left-1/2 w-3 h-3 rounded-full bg-[#8B6F47] -translate-x-1/2 top-8 z-10 ring-4 ring-[#FFF7ED]" />

              {/* Content */}
              <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-24px)] ${index % 2 === 0 ? "sm:text-left" : "sm:text-right"}`}>
                <div className="glass-card-strong rounded-[20px] p-6">
                  <p className="text-[11px] tracking-[0.24em] uppercase text-[#8B6F47] font-medium">
                    {item.date}
                  </p>
                  <p className="heading-serif mt-2 text-[22px] font-light">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[13px] leading-6 text-black/65 font-light">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Spacer for the other side */}
              <div className="hidden sm:block sm:w-[calc(50%-24px)]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ==================== GALLERY SECTION ====================
function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <AnimatedSection className="relative w-full py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-warm-gradient" />
      <div className="absolute inset-0 opacity-80 bg-radial-overlay" />

      <div className="relative mx-auto w-full max-w-[560px]">
        <motion.div variants={fadeInUp} className="text-center">
          <SectionLabel>Gallery</SectionLabel>
          <p className="heading-serif mt-6 text-[32px] sm:text-[36px] leading-[1.12] font-light">
            Momen Bahagia
          </p>
          <SectionDivider />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="mt-10 grid grid-cols-2 gap-3"
        >
          {WEDDING_DATA.gallery.map((img, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                index === 0 ? "col-span-2 aspect-[4/3]" : "aspect-square"
              }`}
              onClick={() => setSelected(index)}
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={WEDDING_DATA.gallery[selected]}
                alt="Full size"
                className="max-w-full max-h-[85vh] object-contain rounded-xl"
              />
              <button
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}

// ==================== GIFT SECTION ====================
function GiftSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyAccount = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <AnimatedSection id="gift" className="relative w-full py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-warm-gradient" />
      <div className="absolute inset-0 opacity-85 bg-radial-overlay" />

      <div className="relative mx-auto w-full max-w-[560px]">
        <motion.div variants={fadeInUp} className="text-center">
          <SectionLabel>Wedding Gift</SectionLabel>
          <p className="heading-serif mt-6 text-[32px] sm:text-[36px] leading-[1.12] font-light">
            Amplop Digital
          </p>
          <SectionDivider />
          <p className="mt-4 text-[13px] leading-7 text-black/65 font-light">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun
            jika Anda ingin memberikan tanda kasih, kami menyediakan amplop digital.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="mt-10 flex flex-col gap-4">
          {WEDDING_DATA.accounts.map((account, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="glass-card rounded-[20px] p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8B6F47]/10 mb-3">
                <Gift className="w-5 h-5 text-[#8B6F47]" />
              </div>
              <p className="text-[13px] font-medium text-[#374151]">{account.bank}</p>
              <p className="heading-serif mt-1 text-[20px] font-light tracking-wide">
                {account.number}
              </p>
              <p className="mt-1 text-[12px] text-black/50">a.n. {account.name}</p>
              <button
                onClick={() => copyAccount(account.number, index)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase text-black/60 hover:bg-black/5 transition"
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="w-3 h-3 text-green-600" />
                    Tersalin
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Salin
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ==================== RSVP & WISHES SECTION ====================
function RsvpWishesSection() {
  const [activeTab, setActiveTab] = useState<"rsvp" | "wishes">("rsvp");
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    attendance: "" as "hadir" | "tidak" | "",
    guests: "1",
  });
  const [wishForm, setWishForm] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wishes, setWishes] = useState<
    { name: string; message: string; time: string }[]
  >([]);

  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch("/api/wishes");
      if (res.ok) {
        const data = await res.json();
        setWishes(data.wishes || []);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  const submitRsvp = async () => {
    if (!rsvpForm.name || !rsvpForm.attendance) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rsvpForm),
      });
      if (res.ok) {
        setRsvpForm({ name: "", attendance: "", guests: "1" });
      }
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitWish = async () => {
    if (!wishForm.name || !wishForm.message) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wishForm),
      });
      if (res.ok) {
        setWishForm({ name: "", message: "" });
        fetchWishes();
      }
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection id="rsvp" className="relative w-full py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-warm-gradient" />
      <div className="absolute inset-0 opacity-85 bg-radial-overlay" />

      <div className="relative mx-auto w-full max-w-[560px]">
        <motion.div variants={fadeInUp} className="text-center">
          <SectionLabel>RSVP &amp; Wishes</SectionLabel>
          <p className="heading-serif mt-6 text-[32px] sm:text-[36px] leading-[1.12] font-light">
            Konfirmasi &amp; Ucapan
          </p>
          <SectionDivider />
        </motion.div>

        {/* Tabs */}
        <motion.div variants={fadeInUp} className="mt-10 flex gap-2 justify-center">
          <button
            onClick={() => setActiveTab("rsvp")}
            className={`px-6 py-2.5 rounded-full text-[12px] tracking-[0.2em] uppercase transition-all ${
              activeTab === "rsvp"
                ? "bg-[#111827] text-white shadow-lg"
                : "bg-white/70 text-black/60 border border-black/10 hover:bg-white/70"
            }`}
          >
            Konfirmasi Kehadiran
          </button>
          <button
            onClick={() => setActiveTab("wishes")}
            className={`px-6 py-2.5 rounded-full text-[12px] tracking-[0.2em] uppercase transition-all ${
              activeTab === "wishes"
                ? "bg-[#111827] text-white shadow-lg"
                : "bg-white/70 text-black/60 border border-black/10 hover:bg-white/70"
            }`}
          >
            Ucapan
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "rsvp" ? (
            <motion.div
              key="rsvp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <div className="glass-card rounded-[24px] p-7 space-y-5">
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase text-black/55 mb-2 block">
                    Nama
                  </label>
                  <Input
                    value={rsvpForm.name}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, name: e.target.value })
                    }
                    placeholder="Masukkan nama Anda"
                    className="rounded-xl border-black/10 bg-white/70 focus:ring-[#8B6F47]/30"
                  />
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase text-black/55 mb-2 block">
                    Konfirmasi Kehadiran
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        setRsvpForm({ ...rsvpForm, attendance: "hadir" })
                      }
                      className={`flex-1 py-3 rounded-xl text-[13px] font-medium transition-all ${
                        rsvpForm.attendance === "hadir"
                          ? "bg-[#8B6F47] text-white shadow-md"
                          : "bg-white/70 text-black/60 border border-black/10 hover:bg-white/70"
                      }`}
                    >
                      Hadir
                    </button>
                    <button
                      onClick={() =>
                        setRsvpForm({ ...rsvpForm, attendance: "tidak" })
                      }
                      className={`flex-1 py-3 rounded-xl text-[13px] font-medium transition-all ${
                        rsvpForm.attendance === "tidak"
                          ? "bg-black/80 text-white shadow-md"
                          : "bg-white/70 text-black/60 border border-black/10 hover:bg-white/70"
                      }`}
                    >
                      Tidak Hadir
                    </button>
                  </div>
                </div>
                {rsvpForm.attendance === "hadir" && (
                  <div>
                    <label className="text-[11px] tracking-[0.2em] uppercase text-black/55 mb-2 block">
                      Jumlah Tamu
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={rsvpForm.guests}
                      onChange={(e) =>
                        setRsvpForm({ ...rsvpForm, guests: e.target.value })
                      }
                      className="rounded-xl border-black/10 bg-white/70 focus:ring-[#8B6F47]/30"
                    />
                  </div>
                )}
                <button
                  onClick={submitRsvp}
                  disabled={
                    isSubmitting ||
                    !rsvpForm.name ||
                    !rsvpForm.attendance
                  }
                  className="w-full group relative overflow-hidden rounded-full bg-[#111827] text-white py-3.5 text-[12px] tracking-[0.22em] uppercase transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mx-auto animate-spin" />
                  ) : (
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Kirim Konfirmasi
                      <Send className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="wishes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              {/* Wishes Form */}
              <div className="glass-card rounded-[24px] p-7 space-y-4">
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase text-black/55 mb-2 block">
                    Nama
                  </label>
                  <Input
                    value={wishForm.name}
                    onChange={(e) =>
                      setWishForm({ ...wishForm, name: e.target.value })
                    }
                    placeholder="Masukkan nama Anda"
                    className="rounded-xl border-black/10 bg-white/70 focus:ring-[#8B6F47]/30"
                  />
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.2em] uppercase text-black/55 mb-2 block">
                    Ucapan
                  </label>
                  <Textarea
                    value={wishForm.message}
                    onChange={(e) =>
                      setWishForm({ ...wishForm, message: e.target.value })
                    }
                    placeholder="Tulis ucapan & doa untuk kedua mempelai"
                    rows={3}
                    className="rounded-xl border-black/10 bg-white/70 focus:ring-[#8B6F47]/30 resize-none"
                  />
                </div>
                <button
                  onClick={submitWish}
                  disabled={isSubmitting || !wishForm.name || !wishForm.message}
                  className="w-full group relative overflow-hidden rounded-full bg-[#111827] text-white py-3.5 text-[12px] tracking-[0.22em] uppercase transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mx-auto animate-spin" />
                  ) : (
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Kirim Ucapan
                      <Send className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              </div>

              {/* Wishes List */}
              <div className="mt-6 space-y-3 max-h-[400px] overflow-y-auto pr-1 no-scrollbar">
                {wishes.length === 0 && (
                  <div className="text-center py-8 text-black/40 text-[13px]">
                    Belum ada ucapan. Jadilah yang pertama!
                  </div>
                )}
                {wishes.map((wish, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card-strong rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#8B6F47]/10 flex items-center justify-center shrink-0">
                        <Heart className="w-3.5 h-3.5 text-[#8B6F47]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium text-[#374151] truncate">
                          {wish.name}
                        </p>
                        <p className="text-[11px] text-black/40">{wish.time}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-[13px] leading-6 text-black/65 font-light">
                      {wish.message}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}

// ==================== CLOSING SECTION ====================
function ClosingSection() {
  return (
    <AnimatedSection className="relative w-full py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-warm-gradient" />
      <div className="absolute inset-0 opacity-80 bg-radial-overlay" />

      <div className="relative mx-auto w-full max-w-[560px]">
        <motion.div
          variants={fadeInUp}
          className="relative overflow-hidden glass-card rounded-[34px] px-7 py-10 text-center"
        >
          <div className="pointer-events-none absolute inset-0 opacity-18 inner-shadow-overlay" />

          <div className="relative">
            <p className="heading-serif text-[28px] sm:text-[32px] leading-[1.12] font-light">
              Terima Kasih
            </p>
            <SectionDivider />
            <p className="mt-5 text-[13px] leading-7 text-black/70 font-light">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
              Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
              kepada kami.
            </p>
            <p className="mt-4 text-[13px] leading-7 text-black/70 font-light">
              Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.
            </p>

            <p className="heading-serif mt-8 text-[14px] tracking-[0.2em] uppercase text-black/60">
              Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
            </p>

            <p className="heading-serif mt-8 text-[28px] font-light">
              {WEDDING_DATA.couple.groom.firstName}{" "}
              <span className="text-[32px] text-black/70">&amp;</span>{" "}
              {WEDDING_DATA.couple.bride.firstName}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ==================== FOOTER ====================
function FooterSection() {
  return (
    <footer className="bg-[#2a2a2a] py-12 px-6">
      <div className="max-w-[560px] mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-white/20" />
          <p className="heading-serif text-[20px] text-white/80 font-light">
            R &amp; A
          </p>
          <span className="h-px w-8 bg-white/20" />
        </div>
        <p className="text-[12px] text-white/50 text-center">
          Made with love for Raka &amp; Aulia
        </p>
        <p className="text-[11px] text-white/30">
          &copy; 2026 Wedding Invitation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ==================== MAIN PAGE ====================
export default function WeddingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="bg-warm-gradient min-h-screen">
      <AnimatePresence>
        {!isOpen && <CoverPage onOpen={() => setIsOpen(true)} />}
      </AnimatePresence>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main content area with decorative image */}
          <div className="relative w-full py-20 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-warm-gradient" />
            <div className="absolute inset-0 opacity-80 bg-radial-overlay" />

            <div className="relative mx-auto w-full max-w-[560px] text-center">
              <motion.p
                className="section-label"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                The Wedding Of
              </motion.p>
              <motion.div
                className="mt-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="heading-serif text-[36px] sm:text-[42px] leading-[1.05] font-light">
                  {WEDDING_DATA.couple.groom.firstName}
                </p>
                <p className="heading-serif text-[40px] sm:text-[46px] leading-none text-black/70 my-1 font-light">
                  &amp;
                </p>
                <p className="heading-serif text-[36px] sm:text-[42px] leading-[1.05] font-light">
                  {WEDDING_DATA.couple.bride.firstName}
                </p>
              </motion.div>
              <motion.div
                className="mt-5 flex items-center justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="h-px w-10 bg-black/20" />
                <p className="section-label text-black/65">
                  {WEDDING_DATA.event.dayName}, {WEDDING_DATA.event.dateStr}
                </p>
                <span className="h-px w-10 bg-black/20" />
              </motion.div>

              {/* Decorative image */}
              <motion.div
                className="mt-8 mx-auto w-full max-w-[300px]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="img-deco-border rounded-2xl overflow-hidden">
                  <img
                    src="/images/wedding/couple-silhouette.png"
                    alt="Raka & Aulia"
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <BlessingSection />
          <CoupleSection />
          <EventSection />
          <CountdownSection />
          <LoveStorySection />
          <GallerySection />
          <GiftSection />
          <RsvpWishesSection />
          <ClosingSection />
          <FooterSection />
        </motion.div>
      )}

      <BackToTemplateButton />
      <MusicPlayer />

      {/* Temporary download ZIP button - top right */}
      <a
        href="/api/download-zip"
        className="fixed top-4 right-4 z-40 flex items-center gap-2 rounded-full bg-[#111827] text-white pl-3 pr-4 py-2.5 shadow-lg hover:scale-105 transition-transform text-[11px] tracking-[0.15em] uppercase font-medium"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Download ZIP</span>
      </a>
    </main>
  );
}
