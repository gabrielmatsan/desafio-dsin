ALTER TABLE "customers" ADD COLUMN "cpf" varchar(11) NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_cpf_unique" UNIQUE("cpf");