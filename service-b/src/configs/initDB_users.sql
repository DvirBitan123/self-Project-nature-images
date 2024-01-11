CREATE TABLE
    IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

INSERT INTO users (email, password)
VALUES (
  'mr.shab@gmail.com',
  'Mr.Shab#12345'
);

create type public.jwt_token as (
  role text,
  exp integer,
  id uuid,
  email varchar
);

create function public.authenticate(
  email text,
  password text
) returns public.jwt_token as $$
declare
  account public.users;
begin
  select a.* into account
    from public.users as a
    where a.email = authenticate.email;

  if account.password = password then
    return (
      'person_role',
      extract(epoch from now() + interval '7 days'),
      account.id,
      account.email
    )::public.jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;
