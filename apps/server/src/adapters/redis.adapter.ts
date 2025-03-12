import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect();
  console.log("Connected to Redis");

  // Enable keyspace notifications (Run in CLI or include in redis.conf)
  await redisClient.configSet("notify-keyspace-events", "KEA");

  // Create a subscriber client
  const subscriber = createClient({ url: "redis://localhost:6379" });
  await subscriber.connect();

  // Listen for changes
  await subscriber.subscribe("__keyevent@0__:set", (key) => {
    console.log(`🔵 Key SET: ${key}`);
  });

  await subscriber.subscribe("__keyevent@0__:del", (key) => {
    console.log(`🔴 Key DELETED: ${key}`);
  });

  console.log("Subscribed to Redis key events");
})();
