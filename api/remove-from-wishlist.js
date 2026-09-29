// @ts-check
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'DELETE') { // Menggunakan POST untuk kemudahan
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { user_id, wishlist, period, status, progress } = req.body;

  if (!user_id || !wishlist || !period || status === undefined || progress === undefined) {
    return res.status(400).json({ error: 'Input tidak lengkap' });
  }

  try {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', user_id)
      .eq('wishlist', wishlist)
      .eq('period', period)
      .eq('status', status)
      .eq('progress', progress);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'Berhasil dihapus dari wishlist' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus dari wishlist', details: error.message });
  }
}