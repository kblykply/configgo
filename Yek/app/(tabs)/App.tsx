import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Event = {
  id: string;
  title: string;
  date: string;
  distanceKm: number;
  image: string;
};

type Leader = {
  id: string;
  name: string;
  km: number;
  avatar: string;
};

const EVENTS: Event[] = [
  {
    id: "e1",
    title: "Saturday city fun ride",
    date: "Sat, 20 Aug",
    distanceKm: 12,
    image:
      "https://images.unsplash.com/photo-1520975922215-e0e43b65a7a3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "e2",
    title: "Sunday gravel loop",
    date: "Sun, 21 Aug",
    distanceKm: 20,
    image:
      "https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=1200&auto=format&fit=crop",
  },
];

const LEADERS: Leader[] = [
  {
    id: "u1",
    name: "Garcia",
    km: 27.3,
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "u2",
    name: "Jonathan",
    km: 28.4,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "u3",
    name: "Natasha",
    km: 26.8,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
  },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header / Greeting */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop",
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.hi}>Hi George!</Text>
              <Text style={styles.subtle}>Let’s cycling today</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={20} color="#111" />
          </TouchableOpacity>
        </View>

        {/* Recap card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Ionicons name="bicycle" size={18} color="#111" />
              <Text style={styles.cardTitle}>Last Recap</Text>
            </View>
            <Text style={styles.cardTag}>This Week</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>24.8 km</Text>
              <Text style={styles.statLabel}>Distance</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>1,046 m</Text>
              <Text style={styles.statLabel}>Elevation Gain</Text>
            </View>
            <View style={[styles.stat, styles.hrStat]}>
              <Text style={[styles.badge, { alignSelf: "flex-end" }]}>82 BPM</Text>
            </View>
          </View>

          {/* tiny dotted chart placeholder */}
          <View style={styles.chart} />
        </View>

        {/* Congrats banner */}
        <View style={styles.banner}>
          <Ionicons name="ribbon-outline" size={18} color="#111" />
          <Text style={styles.bannerText}>
            Congrats! You’ve reached a new record!
          </Text>
        </View>

        {/* Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Events around you</Text>
          <TouchableOpacity>
            <Text style={styles.link}>Explore All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={EVENTS}
          keyExtractor={(e) => e.id}
          renderItem={({ item }) => <EventCard event={item} />}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />

        {/* Leaderboard */}
        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Top Weekly Rank</Text>
          <View style={styles.dotGrid} />
        </View>

        <View style={styles.leaderboard}>
          {LEADERS.map((p, i) => (
            <LeaderRow key={p.id} leader={p} rank={i + 1} />
          ))}
        </View>

        {/* Spacer */}
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Components ---------- */

function EventCard({ event }: { event: Event }) {
  return (
    <View style={styles.eventCard}>
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      <View style={styles.eventBody}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventMeta}>
          {event.date} • {event.distanceKm} km
        </Text>
        <TouchableOpacity style={styles.joinBtn}>
          <Text style={styles.joinText}>Join Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function LeaderRow({ leader, rank }: { leader: Leader; rank: number }) {
  const top = rank <= 3;
  return (
    <View style={styles.leaderRow}>
      <Text style={[styles.rank, top && styles.rankTop]}>{rank}</Text>
      <Image source={{ uri: leader.avatar }} style={styles.leaderAvatar} />
      <Text style={styles.leaderName}>{leader.name}</Text>
      <View style={{ flex: 1 }} />
      <Text style={styles.leaderKm}>{leader.km.toFixed(1)} Km</Text>
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f5f7" },
  scroll: { padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  hi: { fontSize: 22, fontWeight: "800", color: "#111" },
  subtle: { color: "#666" },
  notifBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardHeaderLeft: { flexDirection: "row", alignItems: "center", gap: 6 },
  cardTitle: { fontWeight: "700", fontSize: 16, color: "#111" },
  cardTag: {
    fontSize: 12,
    color: "#666",
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statsRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  stat: { flex: 1 },
  statValue: { fontSize: 18, fontWeight: "800", color: "#111" },
  statLabel: { color: "#777", marginTop: 2 },
  hrStat: { alignItems: "flex-end", justifyContent: "center" },
  badge: {
    fontSize: 12,
    color: "#fff",
    backgroundColor: "#ff6b57",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontWeight: "700",
  },
  chart: {
    marginTop: 10,
    height: 64,
    backgroundColor:
      "repeating-linear-gradient(90deg, #fafafa, #fafafa 8px, #f3f3f3 8px, #f3f3f3 9px)",
    borderRadius: 12,
  },

  banner: {
    marginTop: 12,
    backgroundColor: "#e6f7f1",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bannerText: { color: "#0b7a55", fontWeight: "600" },

  sectionHeader: {
    marginTop: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#111" },
  link: { color: "#7a7a7a", fontWeight: "600" },

  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
  },
  eventImage: { width: "100%", height: 140 },
  eventBody: { padding: 12 },
  eventTitle: { fontSize: 17, fontWeight: "800", color: "#111" },
  eventMeta: { color: "#777", marginTop: 2 },
  joinBtn: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#E63946",
    alignItems: "center",
  },
  joinText: { color: "#fff", fontWeight: "700" },

  dotGrid: {
    width: 120,
    height: 18,
    opacity: 0.25,
    backgroundColor:
      "radial-gradient(circle at 1px 1px, #000 1px, transparent 1px)",
    backgroundSize: 8 as any, // RN web will respect; native ignores (ok as a visual hint)
  },

  leaderboard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 6,
    elevation: 2,
  },
  leaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  rank: {
    width: 26,
    textAlign: "center",
    fontWeight: "800",
    color: "#333",
  },
  rankTop: { color: "#E09F3E" },
  leaderAvatar: { width: 34, height: 34, borderRadius: 17, marginHorizontal: 10 },
  leaderName: { fontWeight: "600", color: "#111" },
  leaderKm: { fontWeight: "700", color: "#111" },
});
