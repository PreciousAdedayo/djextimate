import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ---- Tracks ----
  const tracks = [
    {
      title: "WHAT IS THE EXTIMATE",
      featuredArtist: "Idowest",
      duration: "03:42",
      releaseDate: new Date("2025-11-14"),
      spotify: "https://open.spotify.com/",
      appleMusic: "https://music.apple.com/us/artist/dj-extimate/1749495124",
      audiomack: "https://audiomack.com/",
      youtube: "https://www.youtube.com/channel/UC2YemYQoWWLnD6nm9esQbTA",
      published: true,
    },
    {
      title: "THIS IS IT VOL. 3",
      featuredArtist: null,
      duration: "58:10",
      releaseDate: new Date("2025-06-02"),
      audiomack: "https://audiomack.com/",
      published: true,
    },
    {
      title: "THIS IS IT VOL. 2",
      featuredArtist: null,
      duration: "52:47",
      releaseDate: new Date("2024-12-20"),
      audiomack: "https://audiomack.com/",
      published: true,
    },
    {
      title: "LAGOS NIGHTS, VOL. 1",
      featuredArtist: null,
      duration: "45:03",
      releaseDate: new Date("2024-07-19"),
      published: true,
    },
  ];
  for (const t of tracks) {
    await prisma.track.upsert({
      where: { id: `seed-${t.title}` },
      update: {},
      create: { id: `seed-${t.title}`, ...t },
    });
  }

  // ---- Journal posts ----
  const posts = [
    {
      slug: "evolution-of-afrobeats-dj-culture",
      title: "The Evolution of Afrobeats & DJ Culture",
      category: "Music",
      readTime: "8 min read",
      excerpt:
        "How Nigerian DJs went from warm-up acts to the main event, and what it means for the next generation of selectors.",
      content:
        "Ten years ago the DJ booth in Lagos was a supporting role. Today it's the headline.\n\nAfrobeats didn't just export a sound, it exported a way of reading a room, and the DJs who grew up mixing highlife, amapiano and Afro-house into one continuous night are the ones defining what a set from this city sounds like abroad.\n\nFor me it started with vinyl crates borrowed from an uncle and a single CDJ in a bedroom. What changed everything wasn't gear, it was learning to build a set as a story with a beginning, a peak and a way down, rather than a playlist on shuffle.\n\nThe next wave of DJs won't just play the culture, they'll produce it, remix it and take it to rooms that have never heard it before. That's the movement I'm trying to be part of.",
      published: true,
    },
    {
      slug: "behind-the-booth-lagos-nights",
      title: "Behind the Booth: Lagos Nights",
      category: "Lifestyle",
      readTime: "5 min read",
      excerpt:
        "What actually happens between soundcheck and last call — the version nobody posts.",
      content:
        "Soundcheck is where the night is actually won or lost. Two hours before doors, it's just me, the system tech and a room full of empty chairs.\n\nBy midnight the read on a room changes every four bars. You watch hands, not headlines. When a record works, you feel it half a second before the crowd does.\n\nThe unglamorous part: the drive home is usually longer than the set. That's when I plan the next one.",
      published: true,
    },
    {
      slug: "10-tracks-on-repeat",
      title: "10 Tracks on Repeat",
      category: "Music",
      readTime: "6 min read",
      excerpt:
        "The records currently living in every set — the ones that get a reaction before the drop even lands.",
      content:
        "A running list of what's opening and closing sets right now, from Afro-house edits to amapiano log drums that never miss.\n\nThese aren't always the biggest streaming numbers, they're the ones that move a floor at 1am in a room that's already warm.",
      published: true,
    },
  ];
  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  // ---- Events ----
  const events = [
    {
      id: "seed-extimate-live",
      title: "EXTIMATE LIVE",
      venue: "Club DNA",
      location: "Lagos, Nigeria",
      eventDate: new Date("2026-08-23T20:00:00"),
      description:
        "A full night of Afro-house and tech beats. Doors 8pm till late.",
      published: true,
    },
    {
      id: "seed-sunset-sessions",
      title: "Sunset Sessions",
      venue: "Rooftop, Victoria Island",
      location: "Lagos, Nigeria",
      eventDate: new Date("2026-09-13T17:00:00"),
      description: "Golden-hour open-air set to close out the summer run.",
      published: true,
    },
    {
      id: "seed-this-is-it-launch",
      title: "THIS IS IT VOL. 3 — Launch Party",
      venue: "Backyard, Lekki",
      location: "Lagos, Nigeria",
      eventDate: new Date("2025-06-07T21:00:00"),
      description: "Official mixtape launch party.",
      published: true,
    },
  ];
  for (const e of events) {
    await prisma.event.upsert({
      where: { id: e.id },
      update: {},
      create: e,
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
