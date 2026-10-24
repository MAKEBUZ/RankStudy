ALTER TABLE profiles ADD COLUMN IF NOT EXISTS country char(2);
CREATE TABLE IF NOT EXISTS duels (
 id uuid PRIMARY KEY, subject_id text NOT NULL REFERENCES subjects(id), level_id text NOT NULL,
 status text NOT NULL DEFAULT 'playing' CHECK(status IN ('playing','finished')),
 questions jsonb NOT NULL, round_index integer NOT NULL DEFAULT 0,
 round_started_at timestamptz NOT NULL, round_deadline timestamptz NOT NULL,
 winner_id uuid REFERENCES users(id), finish_reason text, created_at timestamptz NOT NULL DEFAULT now(), finished_at timestamptz
);
CREATE TABLE IF NOT EXISTS duel_players (
 duel_id uuid REFERENCES duels(id) ON DELETE CASCADE, user_id uuid REFERENCES users(id) ON DELETE CASCADE,
 active boolean NOT NULL DEFAULT true, score integer NOT NULL DEFAULT 0, elo_before integer NOT NULL, elo_after integer,
 name_snapshot text NOT NULL, avatar_snapshot text NOT NULL,
 last_seen_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(duel_id,user_id)
);
CREATE UNIQUE INDEX IF NOT EXISTS one_active_duel_idx ON duel_players(user_id) WHERE active;
CREATE TABLE IF NOT EXISTS duel_answers (
 duel_id uuid NOT NULL REFERENCES duels(id) ON DELETE CASCADE, user_id uuid NOT NULL REFERENCES users(id),
 round_index integer NOT NULL, option_index integer NOT NULL CHECK(option_index BETWEEN 0 AND 3),
 correct boolean NOT NULL, points integer NOT NULL, elapsed_ms integer NOT NULL, created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(duel_id,user_id,round_index)
);
CREATE TABLE IF NOT EXISTS matchmaking_queue (
 user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, subject_id text NOT NULL, level_id text NOT NULL,
 elo integer NOT NULL, preferences_version integer NOT NULL, state text NOT NULL CHECK(state IN ('waiting','cancelled','timed_out','matched')),
 duel_id uuid REFERENCES duels(id), created_at timestamptz NOT NULL, expires_at timestamptz NOT NULL, last_seen_at timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS queue_waiting_idx ON matchmaking_queue(subject_id,level_id,created_at) WHERE state='waiting';
CREATE TABLE IF NOT EXISTS elo_history (
 duel_id uuid REFERENCES duels(id) ON DELETE CASCADE, user_id uuid REFERENCES users(id) ON DELETE CASCADE,
 subject_id text NOT NULL REFERENCES subjects(id), before integer NOT NULL, after integer NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(duel_id,user_id)
);
CREATE TABLE IF NOT EXISTS competition_notifications (
 id uuid PRIMARY KEY, user_id uuid REFERENCES users(id) ON DELETE CASCADE, kind text NOT NULL, message text NOT NULL,
 reference_id uuid, read_at timestamptz, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(user_id,kind,reference_id)
);
CREATE TABLE IF NOT EXISTS saved_review (
 user_id uuid REFERENCES users(id) ON DELETE CASCADE, duel_id uuid REFERENCES duels(id) ON DELETE CASCADE,
 round_index integer NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(user_id,duel_id,round_index)
);
CREATE TABLE IF NOT EXISTS challenges (
 id uuid PRIMARY KEY, token_hash char(64) UNIQUE NOT NULL, sender_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 recipient_id uuid REFERENCES users(id) ON DELETE CASCADE, subject_id text NOT NULL REFERENCES subjects(id),
 expires_at timestamptz NOT NULL, accepted_by uuid REFERENCES users(id), duel_id uuid REFERENCES duels(id), created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS social_groups (
 id uuid PRIMARY KEY, name varchar(80) NOT NULL, owner_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 code_hash char(64) UNIQUE NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS group_members (
 group_id uuid REFERENCES social_groups(id) ON DELETE CASCADE, user_id uuid REFERENCES users(id) ON DELETE CASCADE,
 joined_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(group_id,user_id)
);
CREATE INDEX IF NOT EXISTS group_members_user_idx ON group_members(user_id,group_id);
CREATE INDEX IF NOT EXISTS ratings_ranking_idx ON subject_ratings(subject_id,elo DESC,user_id);
CREATE INDEX IF NOT EXISTS elo_history_user_idx ON elo_history(user_id,subject_id,created_at);
CREATE INDEX IF NOT EXISTS duel_players_history_idx ON duel_players(user_id,duel_id);
CREATE INDEX IF NOT EXISTS notification_user_idx ON competition_notifications(user_id,created_at DESC);
CREATE INDEX IF NOT EXISTS profiles_country_idx ON profiles(country,user_id);
