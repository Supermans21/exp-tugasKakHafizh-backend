// @ts-check
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { user_id, wishlist, period, status, progress } = req.body;

  if (!user_id || !wishlist || !period || status === undefined || progress === undefined) {
    return res.status(400).json({ error: 'Input tidak lengkap' });
  }

  try {
    const { data, error } = await supabase
      .from('wishlist_items')
      .insert({ user_id, wishlist, period, status, progress });

    if (error) {
      if (error.code === '23505') {
        return res.status(200).json({ message: 'Wishlist sudah ada di wishlist' });
      }
      throw error;
    }

    res.status(201).json({ message: 'Berhasil ditambahkan ke wishlist' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambahkan ke wishlist', details: error.message });
  }
}