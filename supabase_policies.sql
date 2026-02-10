-- POLICY: Set permissions for 'car-images' bucket
-- NOTE: If you are getting a 'must be owner of table objects' error, it means you are likely not running this as a superuser/admin in the SQL editor, OR the storage schema is managed internally.

-- ATTEMPT 1: Try creating policies directly on `storage.objects` table.
-- If this fails, you may need to use the Supabase Dashboard UI instead (Storage > Buckets > Policies).

BEGIN;

-- 1. Enable RLS on storage.objects (usually enabled by default, but good to ensure)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid conflicts (optional, but cleaner)
DROP POLICY IF EXISTS "Public Access - Insert Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Access - Select Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Access - Delete Images" ON storage.objects;

-- 3. Create a policy to allow anyone (anon role) to INSERT (upload) into 'car-images' bucket
CREATE POLICY "Public Access - Insert Images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'car-images' );

-- 4. Create a policy to allow anyone to SELECT (view) images from 'car-images' bucket
CREATE POLICY "Public Access - Select Images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'car-images' );

-- 5. Create a policy to allow anyone to DELETE images from 'car-images' bucket
CREATE POLICY "Public Access - Delete Images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'car-images' );

COMMIT;
