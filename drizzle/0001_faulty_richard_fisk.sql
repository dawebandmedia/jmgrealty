ALTER TABLE `submissions` ADD `internal_notes` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `submissions` ADD `follow_up_at` text;--> statement-breakpoint
ALTER TABLE `submissions` ADD `first_contacted_at` text;--> statement-breakpoint
ALTER TABLE `submissions` ADD `updated_at` text;