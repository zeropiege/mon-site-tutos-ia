# Guide de déploiement — Mon site tutos IA

## ✅ Build local réussi
Le projet compile sans erreur : `npm run build` ✅

---

## 🚀 Déploiement sur Vercel (Gratuit)

### 1. Créer un compte Vercel
- Allez sur [vercel.com](https://vercel.com) et créez un compte (GitHub/GitLab/Email)

### 2. Importer le projet
- Cliquez sur "Add New..." → "Project"
- Importez depuis GitHub (ou téléchargez le dossier)
- Framework preset : **Next.js** (détecté automatiquement)

### 3. Variables d'environnement (OBLIGATOIRE)
Dans les settings du projet Vercel → Environment Variables, ajoutez :

```
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon
```

### 4. Déployer
- Cliquez sur "Deploy"
- Votre site sera en ligne à `https://votre-projet.vercel.app`

---

## 🗄️ Configuration Supabase (Gratuit - 500MB DB)

### 1. Créer un projet Supabase
- Allez sur [supabase.com](https://supabase.com) → "Start your project"
- Créez une organisation → "New project"
- Choisissez un nom, mot de passe DB, région (Europe de l'Ouest)

### 2. Récupérer les clés
- Settings → API
- Copiez : **Project URL** et **anon public key**

### 3. Configurer l'authentification
- Authentication → Providers
- Activez : **Email** (magic link) + **Google** + **GitHub**
- Pour Google/GitHub : configurez les OAuth credentials dans leurs consoles respectives

### 4. Créer les tables SQL
Dans l'éditeur SQL de Supabase, exécutez :

```sql
-- Profils utilisateurs
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  avatar_url text,
  role text default 'user' check (role in ('admin', 'user')),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Tutoriels
create table tutorials (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content_md text not null,
  category text,
  tags text[],
  published boolean default true,
  author_id uuid references profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Configurations
create table configs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content_md text not null,
  model text,
  tags text[],
  published boolean default true,
  author_id uuid references profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS (Row Level Security)
alter table profiles enable row level security;
alter table tutorials enable row level security;
alter table configs enable row level security;

-- Policies
create policy "Public read published tutorials" on tutorials
  for select using (published = true);

create policy "Public read published configs" on configs
  for select using (published = true);

create policy "Users manage own tutorials" on tutorials
  for all using (auth.uid() = author_id);

create policy "Users manage own configs" on configs
  for all using (auth.uid() = author_id);

create policy "Public profiles" on profiles
  for select using (true);

create policy "Users update own profile" on profiles
  for update using (auth.uid() = id);
```

### 5. Configurer les URLs de redirection
- Authentication → URL Configuration
- **Site URL** : `https://votre-projet.vercel.app`
- **Redirect URLs** : `https://votre-projet.vercel.app/auth/callback`

---

## 📝 Après le déploiement

1. **Testez l'authentification** : Allez sur `/login`, connectez-vous
2. **Créez du contenu** : `/dashboard/new` → ajoutez vos tutos/configs
3. **Domaine personnalisé** (optionnel) : Vercel → Settings → Domains

---

## 🔧 Structure du projet

```
mon-site-tutos/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home (hero + featured)
│   ├── tuto/              # Tutoriels (liste + détail)
│   ├── config/            # Configurations (liste + détail)
│   ├── apps/              # Apps interactives (placeholders)
│   ├── dashboard/         # Espace propriétaire (auth)
│   ├── login/             # Auth Supabase
│   └── auth/callback/     # Callback OAuth
├── components/            # Header, ContentCard, Card
├── content/               # Markdown source (tuto/, config/)
├── lib/                   # Supabase, auth, content, markdown
├── middleware.ts          # Session refresh
└── public/                # Assets statiques
```

---

## 💡 Prochaines étapes

- [ ] Ajouter plus de contenu markdown dans `content/`
- [ ] Implémenter l'édition de contenu existant (`/dashboard/edit/[slug]`)
- [ ] Ajouter la synchronisation Markdown ↔ Supabase
- [ ] Créer de vraies applications dans `/apps`
- [ ] Configurer un domaine personnalisé
- [ ] Ajouter analytics (Vercel Analytics gratuit)

---

## 🆘 Dépannage

| Problème | Solution |
|----------|----------|
| Build échoue sur Vercel | Vérifiez les variables d'env dans Vercel Settings |
| Auth ne marche pas | Vérifiez Site URL et Redirect URLs dans Supabase |
| Erreur 404 sur `/dashboard` | Connectez-vous d'abord via `/login` |
| Styles cassés | Vérifiez que `globals.css` est importé dans `layout.tsx` |
