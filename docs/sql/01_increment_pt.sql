-- increment_pt 関数の作成
-- ユーザーの保有ポイントを加算するRPC

create or replace function increment_pt(amount int)
returns void
language plpgsql
security definer
as $$
begin
  update profiles
  set total_pt = total_pt + amount
  where id = auth.uid();
end;
$$;
