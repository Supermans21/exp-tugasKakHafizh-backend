// @ts-check
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase client di server
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  // Hanya izinkan metode GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { user_identifier } = req.query;

  if (!user_identifier) {
    return res.status(400).json({ error: 'User identifier is required' });
  }

  try {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('product_handle')
      .eq('user_identifier', user_identifier);

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching wishlist', details: error.message });
  }
}