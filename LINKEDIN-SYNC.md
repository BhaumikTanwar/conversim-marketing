# LinkedIn company posts → Storyblok blog drafts

The scheduled GitHub Actions job checks the Conversim company page every 15 minutes. It creates one **draft Storyblok story** per newly published public LinkedIn post. Drafts are not published automatically; after review and publishing, the Blog Resource Grid reads them from the configured folder. Duplicate posts are ignored by their deterministic Storyblok slug.

The first version syncs the post text, date, category, and link to LinkedIn. It does not copy LinkedIn image/video assets into Storyblok, so add a cover image in the draft when appropriate.

## Storyblok setup

1. Create a folder for synced posts, for example `linkedin-posts`, and note its numeric folder ID from the Storyblok editor URL.
2. Create a content type component named `linkedin_post` and allow it as the folder's story type. Add these fields:
   - `title` (text)
   - `description` (textarea)
   - `category` (text)
   - `author_name` (text)
   - `date` (date)
   - `link_url` (text)
   - `link_label` (text)
   - `open_in_new_tab` (boolean)
   - `linkedin_post_id` (text)
3. Add a `story_source_folder` text field to the `resource_grid` component schema. Set it on the Blog page's Resource Grid to `linkedin-posts` (or the folder's full slug). Existing manually entered cards remain visible alongside synced posts.

## GitHub setup

In the marketing repo's **Settings → Secrets and variables → Actions**, add:

**Secrets**

- `LINKEDIN_ACCESS_TOKEN`: OAuth access token with `r_organization_social` permission.
- `LINKEDIN_ORGANIZATION_ID`: company page's numeric organization ID (or its full `urn:li:organization:...`).
- `STORYBLOK_MANAGEMENT_TOKEN`: Storyblok Management API personal access token. Never use the public Delivery API token here.

**Variables**

- `LINKEDIN_API_VERSION`: LinkedIn API version in `YYYYMM` format supported by your app.
- `LINKEDIN_SYNC_START_AT`: ISO-8601 timestamp in UTC; posts published before this time are ignored.
- `STORYBLOK_SPACE_ID`: Storyblok space ID.
- `STORYBLOK_BLOG_FOLDER_ID`: numeric ID of the folder from step 1.

Use **Actions → Sync LinkedIn posts to Storyblok → Run workflow** for a manual test. Scheduled runs start when the workflow is merged into the repository's default branch; GitHub only runs scheduled workflows from that branch. The LinkedIn access token currently needs manual replacement when it expires (LinkedIn access tokens are typically valid for 60 days). The integration uses GitHub Actions free minutes, subject to the account's included usage limits.
