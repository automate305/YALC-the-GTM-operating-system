CREATE TABLE `call_recordings` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text DEFAULT 'default' NOT NULL,
	`provider` text DEFAULT 'claap' NOT NULL,
	`provider_call_id` text NOT NULL,
	`lead_id` text,
	`campaign_id` text,
	`recording_url` text,
	`call_time` integer NOT NULL,
	`duration_sec` integer DEFAULT 0 NOT NULL,
	`participant_count` integer DEFAULT 0 NOT NULL,
	`participants` text,
	`first_seen_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `call_recordings_provider_call_idx` ON `call_recordings` (`provider`,`provider_call_id`);--> statement-breakpoint
CREATE INDEX `call_recordings_lead_idx` ON `call_recordings` (`lead_id`);--> statement-breakpoint
CREATE INDEX `call_recordings_call_time_idx` ON `call_recordings` (`call_time`);--> statement-breakpoint
CREATE TABLE `call_transcripts` (
	`id` text PRIMARY KEY NOT NULL,
	`call_recording_id` text NOT NULL,
	`text` text NOT NULL,
	`summary` text,
	`moments` text,
	`language` text DEFAULT 'en' NOT NULL,
	`ingested_at` integer,
	FOREIGN KEY (`call_recording_id`) REFERENCES `call_recordings`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `call_transcripts_recording_idx` ON `call_transcripts` (`call_recording_id`);