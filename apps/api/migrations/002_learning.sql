ALTER TABLE users ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'student' CHECK (role IN ('student','teacher','admin'));
CREATE TABLE IF NOT EXISTS education_levels (id text PRIMARY KEY, name text NOT NULL);
CREATE TABLE IF NOT EXISTS subjects (id text PRIMARY KEY, name text NOT NULL, active boolean NOT NULL DEFAULT true);
CREATE TABLE IF NOT EXISTS level_subjects (level_id text REFERENCES education_levels(id), subject_id text REFERENCES subjects(id), PRIMARY KEY(level_id,subject_id));
CREATE TABLE IF NOT EXISTS avatars (id text PRIMARY KEY, name text NOT NULL, asset text NOT NULL);
CREATE TABLE IF NOT EXISTS profiles (
 user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 level_id text REFERENCES education_levels(id), avatar_id text REFERENCES avatars(id),
 preferences_version integer NOT NULL DEFAULT 0, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS user_subjects (user_id uuid REFERENCES users(id) ON DELETE CASCADE, subject_id text REFERENCES subjects(id), PRIMARY KEY(user_id,subject_id));
CREATE TABLE IF NOT EXISTS teacher_applications (
 id uuid PRIMARY KEY, user_id uuid UNIQUE NOT NULL REFERENCES users(id), institution varchar(160) NOT NULL,
 institutional_email varchar(254) NOT NULL, evidence_reference varchar(1000) NOT NULL,
 status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
 reason text, reviewed_by uuid REFERENCES users(id), submitted_at timestamptz NOT NULL DEFAULT now(), reviewed_at timestamptz,
 evidence_expires_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS questions (
 id uuid PRIMARY KEY, owner_id uuid REFERENCES users(id), subject_id text NOT NULL REFERENCES subjects(id),
 topic varchar(120) NOT NULL, difficulty integer NOT NULL CHECK(difficulty BETWEEN 1 AND 3),
 prompt varchar(1000) NOT NULL, options jsonb NOT NULL, correct_index integer NOT NULL CHECK(correct_index BETWEEN 0 AND 3),
 explanation varchar(2000) NOT NULL, source varchar(500) NOT NULL, license varchar(100) NOT NULL,
 status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected')),
 version integer NOT NULL DEFAULT 1, reason text, reviewed_by uuid REFERENCES users(id), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS question_versions (
 question_id uuid REFERENCES questions(id), version integer NOT NULL, snapshot jsonb NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(question_id,version)
);
CREATE TABLE IF NOT EXISTS moderation_audit (
 id uuid PRIMARY KEY, actor_id uuid NOT NULL REFERENCES users(id), entity_type text NOT NULL,
 entity_id uuid NOT NULL, action text NOT NULL, reason text NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS calibrations (
 id uuid PRIMARY KEY, user_id uuid NOT NULL REFERENCES users(id), subject_id text NOT NULL REFERENCES subjects(id),
 questions jsonb NOT NULL, status text NOT NULL DEFAULT 'started' CHECK(status IN ('started','completed','skipped')),
 elo integer, correct_count integer, answers jsonb, created_at timestamptz NOT NULL DEFAULT now(), finished_at timestamptz,
 UNIQUE(user_id,subject_id)
);
CREATE TABLE IF NOT EXISTS subject_ratings (
 user_id uuid REFERENCES users(id), subject_id text REFERENCES subjects(id), elo integer NOT NULL CHECK(elo BETWEEN 400 AND 2400),
 calibration_id uuid NOT NULL REFERENCES calibrations(id), PRIMARY KEY(user_id,subject_id)
);
CREATE INDEX IF NOT EXISTS approved_questions_idx ON questions(subject_id,status);
CREATE INDEX IF NOT EXISTS audit_entity_idx ON moderation_audit(entity_type,entity_id);
CREATE TABLE IF NOT EXISTS oauth_attempts (
 state_hash char(64) PRIMARY KEY, provider text NOT NULL CHECK(provider IN ('google','apple')),
 browser_hash char(64) NOT NULL, nonce text NOT NULL, verifier text NOT NULL,
 link_user_id uuid REFERENCES users(id), expires_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS oauth_identities (
 provider text NOT NULL CHECK(provider IN ('google','apple')), subject text NOT NULL,
 user_id uuid NOT NULL REFERENCES users(id), PRIMARY KEY(provider,subject), UNIQUE(provider,user_id)
);
