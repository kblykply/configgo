// App.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

/* ---------- Tokens (iOS-like dark + neon glass) ---------- */
const BG = "#0A0C10";
const CARD = "#12151B";
const TEXT = "#F3F5F7";
const MUTED = "#9AA3AF";
const ACCENT = "#C8F560"; // neon vurgulu
const ACCENT_2 = "#7C8CFF"; // mor-mavi neon
const HAIR = "rgba(255,255,255,0.06)";

type EventItem = {
  id: string;
  title: string;
  host: string;
  when: string;
  status: "Devam Ediyor" | "Yakında";
  priceTag: "Ücretsiz" | "Ücretli";
  thumb: string;
  avatars: string[];
  location?: string;
};

const CURRENT: EventItem = {
  id: "e1",
  title: "Kurucular × Yatırımcılar Akşam Buluşması",
  host: "Gullie Topluluk Etkinlikleri",
  when: "22:00 · Dubai",
  status: "Devam Ediyor",
  priceTag: "Ücretsiz",
  thumb:
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1400&q=80&auto=format&fit=crop",
  avatars: [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80&auto=format&fit=crop",
  ],
  location: "Downtown Dubai",
};

const UPCOMING: EventItem = {
  id: "e2",
  title: "Operatörler × Yatırımcılar Networking",
  host: "Gullie Topluluk Etkinlikleri",
  when: "25 dk sonra · 22:00",
  status: "Yakında",
  priceTag: "Ücretli",
  thumb:
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1400&q=80&auto=format&fit=crop",
  avatars: [
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80&auto=format&fit=crop",
    // Bozuk bir görsel testi için kasıtlı kötü url:
    "https://example.com/does-not-exist.jpg",
  ],
  location: "Marina Walk",
};

const NEARBY: EventItem[] = [
  {
    id: "n1",
    title: "6 Kişilik Akşam Yemeği · İtalyan",
    host: "Topluluk Masa Buluşması",
    when: "Yarın · 20:00",
    status: "Yakında",
    priceTag: "Ücretli",
    thumb:
      "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?w=1200&q=80&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop",
    ],
    location: "Nişantaşı",
  },
  {
    id: "n2",
    title: "Sabah Koşusu · 5K",
    host: "Aktif Yaşam Kulübü",
    when: "Cumartesi · 07:00",
    status: "Yakında",
    priceTag: "Ücretsiz",
    thumb:
      "https://images.unsplash.com/photo-1541944743827-e04aa6427c33?w=1200&q=80&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80&auto=format&fit=crop",
    ],
    location: "Maçka Parkı",
  },
  {
    id: "n3",
    title: "Film Gecesi · Bağımsız Seçkiler",
    host: "Sinema Kulübü",
    when: "Pazar · 21:00",
    status: "Yakında",
    priceTag: "Ücretsiz",
    thumb:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?w=1200&q=80&auto=format&fit=crop",
    avatars: [
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop",
    ],
    location: "Karaköy",
  },
];

const POPULAR: EventItem[] = [
  {
    id: "p1",
    title: "Hafta Sonu Kamp · 12 Kişi",
    host: "Doğa & Keşif",
    when: "Cumartesi · 08:00",
    status: "Yakında",
    priceTag: "Ücretli",
    thumb:
      "https://images.unsplash.com/photo-1504280390368-3971a1e7b69b?w=1200&q=80&auto=format&fit=crop",
    avatars: [],
    location: "Sapanca",
  },
  {
    id: "p2",
    title: "Oyun Gecesi · Strateji",
    host: "Masaüstü Oyun Topluluğu",
    when: "Cuma · 19:30",
    status: "Yakında",
    priceTag: "Ücretsiz",
    thumb:
      "https://images.unsplash.com/photo-1593113598332-cc9b725b6b4d?w=1200&q=80&auto=format&fit=crop",
    avatars: [],
    location: "Kadıköy",
  },
];

/* ---------- App ---------- */
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <StatusBar
        barStyle="light-content"
        translucent={Platform.OS === "android"}
        backgroundColor="transparent"
      />
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80&auto=format&fit=crop",
        }}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["#0A0C10ee", "#0A0C10f6", "#0A0C10"]}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ padding: 16, paddingBottom: 64 }}
            showsVerticalScrollIndicator={false}
          >
            {/* ÜST ÇUBUK */}
            <View style={styles.topRow}>
              <View>
                <Text style={styles.kicker}>Topluluk</Text>
                <Text style={styles.h1}>Etkinliklerim</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <BlurIcon>
                  <Ionicons name="search" size={18} color="#fff" />
                </BlurIcon>
                <TouchableOpacity activeOpacity={0.9} style={styles.plusBtn}>
                  <Ionicons name="add" size={20} color="#111" />
                </TouchableOpacity>
              </View>
            </View>

            {/* KATEGORİLER */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 4 }}
            >
              {[
                "Tümü",
                "Yemek",
                "Seyahat",
                "Spor",
                "Girişim",
                "Networking",
                "Kültür-Sanat",
              ].map((c, i) => (
                <Chip key={i} label={c} active={i === 0} />
              ))}
            </ScrollView>

            {/* ÖNE ÇIKAN ŞERİT (soft) */}
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=1600&q=80&auto=format&fit=crop",
              }}
              style={styles.feature}
              imageStyle={{ borderRadius: 18 }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.85)"]}
                style={StyleSheet.absoluteFill}
              />
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <BlurView intensity={25} tint="dark" style={styles.featureBar}>
                  <Text style={styles.featureText}>
                    Ücretsiz networking gecesi · {CURRENT.location}
                  </Text>
                  <Tag label="Bu Akşam" color={ACCENT_2} />
                </BlurView>
              </View>
            </ImageBackground>

            {/* DEVAM EDEN */}
            <SectionTitle title="Devam Eden Etkinlikler" />
            <EventRow e={CURRENT} cta />

            {/* YAKINDA */}
            <SectionTitle title="Yakında" top={16} />
            <EventRow e={UPCOMING} />

            {/* YAKINDAKİLER — yatay kartlar */}
            <SectionTitle title="Yakınınızdakiler" top={16} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 6 }}
            >
              {NEARBY.map((ev) => (
                <HorizontalCard key={ev.id} e={ev} />
              ))}
            </ScrollView>

            {/* POPÜLER — sade liste */}
            <SectionTitle title="Bu Hafta Popüler" top={12} />
            {POPULAR.map((ev) => (
              <MiniRow key={ev.id} e={ev} />
            ))}

            {/* ÖNERİLEN KİŞİLER */}
            <SectionTitle title="Önerilen Kişiler" top={16} />
            <PeopleRow
              people={[
                {
                  name: "Elif K.",
                  title: "Ürün Yöneticisi",
                  avatar:
                    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80&auto=format&fit=crop",
                },
                {
                  name: "Mert A.",
                  title: "Kurucu · Fintech",
                  avatar:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop",
                },
                {
                  name: "Deniz T.",
                  title: "Tasarımcı",
                  avatar:
                    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80&auto=format&fit=crop",
                },
              ]}
            />

            {/* HIZLI EYLEMLER */}
            <SectionTitle title="Hızlı Eylemler" top={16} />
            <QuickActions />

            {/* ALT BOŞLUK */}
            <View style={{ height: 12 }} />
          </ScrollView>

          {/* YÜZEN OLUŞTUR BUTONU */}
          <TouchableOpacity activeOpacity={0.9} style={styles.fab}>
            <LinearGradient
              colors={[ACCENT, "#9BF0B2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.fabInner}
            >
              <Ionicons name="add" size={22} color="#0B0D10" />
              <Text style={styles.fabText}>Etkinlik Oluştur</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

/* ---------- Reusable UI ---------- */

function BlurIcon({ children }: { children: React.ReactNode }) {
  return (
    <BlurView intensity={35} tint="dark" style={styles.iconBtn}>
      {children}
    </BlurView>
  );
}

function Tag({
  label,
  color,
  light = false,
}: {
  label: string;
  color: string;
  light?: boolean;
}) {
  return (
    <View
      style={{
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: light ? `${color}1a` : `${color}2b`,
        borderWidth: 1,
        borderColor: `${color}55`,
      }}
    >
      <Text
        style={{
          color: light ? color : "#fff",
          fontSize: 12,
          fontWeight: "800",
          letterSpacing: 0.3,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function Chip({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <View
      style={[
        styles.chip,
        active && { backgroundColor: "rgba(200,245,96,0.12)", borderColor: ACCENT },
      ]}
    >
      <Ionicons
        name={active ? "sparkles-outline" : "ellipse-outline"}
        size={12}
        color={active ? ACCENT : "#cdd3d9"}
        style={{ marginRight: 6 }}
      />
      <Text style={[styles.chipText, active && { color: "#E9FBE2" }]}>{label}</Text>
    </View>
  );
}

function SectionTitle({ title, top = 8 }: { title: string; top?: number }) {
  return (
    <Text style={[styles.section, { marginTop: top }]}>{title}</Text>
  );
}

/** Ağ görseli bozulursa şık bir placeholder gösteren güvenli görsel */
function SafeImage({
  uri,
  style,
  radius = 12,
  icon = "image-outline",
}: {
  uri: string;
  style?: any;
  radius?: number;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  const [err, setErr] = useState(false);
  if (err || !uri) {
    return (
      <View
        style={[
          style,
          {
            backgroundColor: "rgba(255,255,255,0.04)",
            borderRadius: radius,
            borderWidth: 1,
            borderColor: HAIR,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Ionicons name={icon} size={22} color="#9AA3AF" />
      </View>
    );
  }
  return (
    <Image
      source={{ uri }}
      style={[style, { borderRadius: radius }]}
      onError={() => setErr(true)}
    />
  );
}

function AvatarStack({ urls }: { urls: string[] }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {urls.slice(0, 4).map((u, i) => (
        <SafeImage
          key={i}
          uri={u}
          style={[styles.avatar, { marginLeft: i === 0 ? 0 : -10 }]}
          radius={12}
          icon="person-outline"
        />
      ))}
      {urls.length > 4 && (
        <View style={[styles.avatar, { marginLeft: -10, backgroundColor: CARD }]}>
          <Text style={{ color: "#cdd3d9", fontSize: 12, fontWeight: "800" }}>
            +{urls.length - 4}
          </Text>
        </View>
      )}
    </View>
  );
}

function EventRow({ e, cta = false }: { e: EventItem; cta?: boolean }) {
  return (
    <BlurView intensity={30} tint="dark" style={styles.row}>
      <SafeImage uri={e.thumb} style={styles.thumb} icon="images-outline" />
      <View style={{ flex: 1, paddingLeft: 12 }}>
        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
          {e.status === "Devam Ediyor" ? (
            <Tag label="Devam Ediyor" color={ACCENT_2} />
          ) : (
            <Tag label="Yakında" color="#2BB673" />
          )}
          {e.priceTag === "Ücretsiz" ? (
            <Tag label="Ücretsiz" color="#E8B923" light />
          ) : (
            <Tag label="Ücretli" color="#F24C5E" light />
          )}
          {e.location ? <Tag label={e.location} color="#4FB2FF" light /> : null}
        </View>

        <Text style={styles.eventTitle} numberOfLines={2}>
          {e.title}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Ionicons name="people-outline" size={14} color="#cdd3d9" />
          <Text style={styles.host} numberOfLines={1}>
            {e.host}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <AvatarStack urls={e.avatars} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Ionicons name="time-outline" size={14} color="#cdd3d9" />
            <Text style={styles.when}>{e.when}</Text>
            {cta && (
              <TouchableOpacity activeOpacity={0.9} style={styles.joinBtn}>
                <Text style={styles.joinText}>Katıl</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </BlurView>
  );
}

function HorizontalCard({ e }: { e: EventItem }) {
  return (
    <View style={styles.hCard}>
      <SafeImage uri={e.thumb} style={styles.hCardImg} icon="images-outline" />
      <View style={{ padding: 10, gap: 6 }}>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Tag label={e.status} color="#2BB673" />
          <Tag label={e.priceTag} color="#F2DDA6" light />
        </View>
        <Text style={styles.hCardTitle} numberOfLines={2}>
          {e.title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Ionicons name="location-outline" size={14} color="#cdd3d9" />
          <Text style={styles.hCardMeta} numberOfLines={1}>
            {e.location} · {e.when}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <AvatarStack urls={e.avatars} />
          <TouchableOpacity activeOpacity={0.9} style={styles.miniCta}>
            <Text style={styles.miniCtaText}>Detay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function MiniRow({ e }: { e: EventItem }) {
  return (
    <View style={styles.miniRow}>
      <SafeImage uri={e.thumb} style={styles.miniImg} icon="images-outline" />
      <View style={{ flex: 1, paddingLeft: 10 }}>
        <Text style={styles.miniTitle} numberOfLines={1}>
          {e.title}
        </Text>
        <Text style={styles.miniMeta} numberOfLines={1}>
          {e.location} · {e.when}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#cdd3d9" />
    </View>
  );
}

function PeopleRow({
  people,
}: {
  people: { name: string; title: string; avatar: string }[];
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 6 }}
    >
      {people.map((p, i) => (
        <View key={i} style={styles.person}>
          <SafeImage uri={p.avatar} style={styles.personImg} radius={28} icon="person-outline" />
          <Text style={styles.personName} numberOfLines={1}>
            {p.name}
          </Text>
          <Text style={styles.personTitle} numberOfLines={1}>
            {p.title}
          </Text>
          <TouchableOpacity activeOpacity={0.9} style={styles.followBtn}>
            <Text style={styles.followText}>Takip Et</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

function QuickActions() {
  const actions = [
    { icon: "calendar-outline", label: "Haftalık Plan" },
    { icon: "sparkles-outline", label: "Yeni Etkinlik" },
    { icon: "chatbubble-ellipses-outline", label: "Sohbet Odaları" },
    { icon: "trophy-outline", label: "Rozetlerim" },
  ] as const;

  return (
    <View style={styles.qaGrid}>
      {actions.map((a, i) => (
        <View key={i} style={styles.qaItem}>
          <BlurView intensity={35} tint="dark" style={styles.qaIconWrap}>
            <Ionicons name={a.icon as any} size={18} color={ACCENT} />
          </BlurView>
          <Text style={styles.qaLabel}>{a.label}</Text>
        </View>
      ))}
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  kicker: { color: ACCENT, fontSize: 12, fontWeight: "800", letterSpacing: 0.6 },
  h1: { color: TEXT, fontSize: 24, fontWeight: "900" },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 10,
  },
  iconBtn: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: HAIR,
  },
  plusBtn: {
    backgroundColor: ACCENT,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: HAIR,
    marginRight: 8,
  },
  chipText: { color: "#e7ebf0", fontWeight: "700", fontSize: 12 },

  feature: { height: 120, marginVertical: 10 },
  featureBar: {
    margin: 10,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "rgba(19,22,27,0.6)",
    borderWidth: 1,
    borderColor: HAIR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  featureText: { color: TEXT, fontWeight: "800" },

  section: {
    color: MUTED,
    marginVertical: 8,
    fontWeight: "800",
    letterSpacing: 0.3,
    fontSize: 13,
  },

  row: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 10,
    marginBottom: 8,
    backgroundColor: "rgba(19,22,27,0.65)",
    borderWidth: 1,
    borderColor: HAIR,
  },
  thumb: { width: 120, height: 84, borderRadius: 12 },

  eventTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 6,
    letterSpacing: 0.2,
  },
  host: { color: "#cdd3d9" },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: CARD,
    backgroundColor: CARD,
    alignItems: "center",
    justifyContent: "center",
  },
  when: { color: "#d9dee4", fontWeight: "800" },
  joinBtn: {
    marginLeft: 6,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "rgba(200,245,96,0.14)",
    borderWidth: 1,
    borderColor: ACCENT,
  },
  joinText: { color: "#EAFCE1", fontWeight: "800", fontSize: 12 },

  /* Horizontal card */
  hCard: {
    width: 220,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: "rgba(19,22,27,0.65)",
    borderWidth: 1,
    borderColor: HAIR,
    overflow: "hidden",
  },
  hCardImg: { width: "100%", height: 120, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  hCardTitle: { color: TEXT, fontWeight: "900", fontSize: 14.5 },
  hCardMeta: { color: "#cdd3d9", fontSize: 12 },

  /* Popular mini rows */
  miniRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 14,
    backgroundColor: "rgba(19,22,27,0.45)",
    borderWidth: 1,
    borderColor: HAIR,
    marginBottom: 8,
  },
  miniImg: { width: 56, height: 40, borderRadius: 10 },
  miniTitle: { color: TEXT, fontWeight: "800" },
  miniMeta: { color: "#cdd3d9", fontSize: 12 },

  /* People */
  person: {
    width: 132,
    borderRadius: 16,
    padding: 10,
    marginRight: 10,
    backgroundColor: "rgba(19,22,27,0.55)",
    borderWidth: 1,
    borderColor: HAIR,
    alignItems: "center",
  },
  personImg: { width: 56, height: 56 },
  personName: { color: TEXT, fontWeight: "900", marginTop: 8 },
  personTitle: { color: "#cdd3d9", fontSize: 12 },
  followBtn: {
    marginTop: 8,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "rgba(124,140,255,0.14)",
    borderWidth: 1,
    borderColor: ACCENT_2,
  },
  followText: { color: "#E6E9FF", fontWeight: "800", fontSize: 12 },

  /* Quick actions */
  qaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  qaItem: {
    width: "48%",
    borderRadius: 14,
    backgroundColor: "rgba(19,22,27,0.55)",
    borderWidth: 1,
    borderColor: HAIR,
    padding: 12,
  },
  qaIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: HAIR,
    marginBottom: 8,
  },
  qaLabel: { color: TEXT, fontWeight: "800" },

  /* FAB */
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16 + (Platform.OS === "android" ? 8 : 0),
    borderRadius: 999,
    overflow: "hidden",
    elevation: 6,
  },
  fabInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  fabText: { color: "#0A0C10", fontWeight: "900" },
});
