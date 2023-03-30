# Kickstart Fastify
Fastify ကိုအသုံးပြုပြီး REST API အသစ်တစ်ခု‌စရေးဖို့ ရှိနေတယ်ဆိုရင် ဒီ repo က အသုံးဝင်မယ်လိုမျှော်လင့်ရပါတယ်။ ဒီ repo ထဲမှာ fasitfy service တစ်ခုရေးသားဖို့ အခြေခံကျတဲ့လိုအပ်ချက်တွေကို ကြိုတင်ထည့်သွင်းပြီးတည်ဆောက်ပေးထားပါတယ်။

## Get started
### 1. Clone this repo
``` console
 git clone https://github.com/KaungWai/kickstart-fastify.git
```
### 2. Move to project directory
``` console
cd kickstart-fastify
```
### 3. Install dependencies
``` console
npm install
```
### 4. Setup a database of your choice
ORM library အနေနဲ့ prisma ကို အသုံးပြုထားပါတယ်။ prisma ကထင်ရှားတဲ့ RDBMS တွေဖြစ်တဲ့ mysql, sqlite, postgresql, sqlserver တို့ကို support ပေးတဲ့အတွက် အဆင်ပြေရာတစ်ခုခုနဲ့ database တစ်ခုကိုတည်ဆောက်လိုက်ပါ။ 
<br/><br/>
သို့မဟုတ်
<br/><br/>
docker အသုံးပြုတတ်တယ် ဆိုရင် postgresql အတွက် dockcer-compose.yml ရေးပေးထားပါတယ်။ အောက်က command ကို run လိုက်ရုံပါပဲ။
``` console
docker compose up -d
```
### 5. Generate JWT secrets
authentication အတွက် JWT ကိုအသုံးပြုထားတဲ့အတွက် private key နဲ့ public key ကို generate လုပ်ပေးဖို့လိုပါတယ်။ Mac သို့မဟုတ် Linux အသုံးပြုသူဆိုရင် စက်ထဲမှာ openssl ဆိုတဲ့ software က install လုပ်ပြီးသားဖြစ်ဖို့များပါတယ်။ မရှိသေးဘူးရင်တော့ openssl ကို အရင်သွင်းလိုက်ပါ။ generate လုပ်တဲ့ script က ဒီ repo ထဲမှာ ကြို‌ရေးပေးထားပါတယ်။ 
``` console
bash ./scripts/keygen.sh
```
ဒါဆိုရင် `./keys` folder ထဲမှာ private key နဲ့ public key ရပါပြီ။
### 6. Create .env file
.env.example ဖိုင်ကို နမူနာယူပြီး .env ကို create လုပ်ပေးပါ။
``` env
# fastify server
HOST=localhost
PORT=3333

# environmet (development | production)
ENVIRONMENT=development

# allowed origins (use comma separation for muliple origins)
ALLOWED_ORIGINS=localhost:3333

# absolute paths to jwt keys
JWT_PRIVATE_KEY_PATH="/absolute-path-to/private"
JWT_PUBLIC_KEY_PATH="/absolute-path-to/public.pub"

# connection stirng
DATABASE_URL="postgresql://kf_user:kf_password@localhost:5432/kickstart_fastify"
```
`DATABASE_URL` ကို No.4 မှာ တည်ဆောက်ခဲ့တဲ့ database info အတိုင်းအစားထိုးပေးပါ။ `JWT_PRIVATE_KEY_PATH` နဲ့ `JWT_PUBLIC_KEY_PATH` ကို No.5 မှာ generate လုပ်ခဲ့တဲ့ key ‌တွေရဲ့ absolute path တွေနဲ့ အစားထိုးပေးပါ။

### 7. Migrate
လက်ရှိ source ထဲမှာ `prisma` ဆိုတဲ့ folder ရှိပါတယ်။ အဲထဲမှာမှ `schema.prisma` က ကျွန်တော်တို့ project ထဲမှာ ဘယ်လို databse table တွေ ပါဝင်မယ်ဆိုတာကို ‌ရေးထားရမှာပါ။ ခုချိန်မှာ နမူနာ‌အနေနဲ့ User နဲ့ Product ဆိုတဲ့ table နှစ်ခုရှိနေလိမ့်မယ်။
```
model User {
  userId     String     @id @db.VarChar(12)
  userName   String     @db.VarChar(100)
  salt       String     @db.VarChar(29)
  hash       String     @db.VarChar(60)
  permission Permission
  createdAt  DateTime   @default(now()) @db.Timestamp()
  updatedAt  DateTime   @default(now()) @db.Timestamp()
}

model Product {
  productId          String   @id @db.VarChar(12)
  productName        String   @db.VarChar(100)
  productDescription String   @db.VarChar(500)
  productPrice       Int      @db.Integer
  createdAt          DateTime @default(now()) @db.Timestamp()
  updatedAt          DateTime @default(now()) @db.Timestamp()
}

enum Permission {
  READ_ONLY
  READ_WRITE
}
```
ဒါက definition အနေနဲ့ပဲ ရှိနေသေးတာမို့လို့ database မှာ သွားပြီး table တွေ မဖန်တီးရသေးပါဘူး။ တကယ်ဖန်တီးဖို့အတွက် ‌အောက်က command ကို run ပေးဖို့လိုပါတယ်
```
npx prisma migrate dev
```
run ပြီးပြီဆိုရင်တော့ database table တွေက schema.prisma မှာ declare လုပ်ခဲ့တဲ့အတိုင်း တည်ဆောက်ပြီးသားဖြစ်သွားမှာဖြစ်ပါတယ်။ နောက်ပိုင်းတစ်ခုခုပြုပြင်ချင်တာရှိရင်လဲ schema.prisma ကို ပြင်ပြီး migrate ပြန်လုပ်ပေးရုံပါပဲ။ sql တွေ‌ရေးနေစရာမလိုတဲ့ အတွက် အတော်လေးအဆင်ပြေစေပါတယ်။

### 8. Seeding
လက်ရှိ source ထဲမှာ နမူနာအနေနဲ့ ရေးထားတဲ့ API တစ်ချို့ရှိပါတယ်။ ဒီ API တွေအတွက် dummy data တွေကို seeding လုပ်ပေးထားတဲ့အတွက် အောက်က command ကို run ပေးပါ
```
npx prisma db seed
```

### 9. Ready
seeding အထိပြီးပြီဆိုရင်တော့ တကယ် run ကြည့်ဖို့ အဆင်သင့်ဖြစ်နေပါပြီ။ 
```
npm run dev
```
![image](https://user-images.githubusercontent.com/30652148/208295042-3f1bc66d-dfe9-491c-a6fd-2364fb14dc97.png)
ဘာပြဿနာမှမရှိခဲ့ဘူးဆိုရင်တော့ အပေါ်အတိုင်း localhost:3333 မှာ up & running ဖြစ်သွားမှာပါ။ 
<br>
`http://localhost:3333/docs`ကိုဝင်ကြည့်မယ်ဆိုရင် swagger documentation ကိုပါမြင်ရမှာပါ။
<br><br>
![image](https://user-images.githubusercontent.com/30652148/217378570-b7edfd58-528d-491f-914f-4445e195b0fb.png)
swagger ပေါ်မှာပဲ login လုပ်ပြီး product api တွေကို စမ်းသပ် run ကြည့်လို့ရပါပြီ။ username နဲ့ password က `./prisma/seeds/01_User.ts` ဖိုင်ထဲမှာကြည့်ပါ။
## Folder structre explained
### 1. `.vscode`
လက်ရှိ project ကို vscode အသုံးပြုပြီး ဆက်လက် develop လုပ်ဖို့တိုက်တွန်းလိုပါတယ်။
<br>
`.vscode/extensions.json` ထဲမှာ လက်ရှိ project အတွက် install လုပ်ထားသင့်တဲ့ extensions တွေကို define လုပ်ထားပါတယ်။ extension search box မှာ @recommended လို့ရိုက်ထည့်ပြီး တစ်ခုချင်းစီ install လုပ်သွားရုံပါပဲ။
<img src="https://user-images.githubusercontent.com/30652148/228264248-27c7df9d-5fbc-4669-9000-9fa3e5a2a766.png">
`.vscode/launch.json`ထဲမှာတော့ debug အတွက် setting ကို define လုပ်ထားပါတယ်။ vscode menu bar ရဲ့ Run ထဲက Start Debugging ကို နှိပ်ပြီး debug mode နဲ့ run လို့ရပါတယ်။
<br>
`.vscode/setting.json`ကတော့ လက်ရှိ workspace ရဲ့ setting ဖြစ်ပါတယ်။ ကိုယ်တိုင်ပဲလေ့လာကြည့်ပါ။ 
### 2. docker
postgresql အတွက် Dockerfile ကိုရေးပေးထားပါတယ်။ project root folder ထဲက docker-compose.yml file နဲ့ အတူတွဲပြီးကြည့်ပါ။
### 3. prisma
prisma.schema (database definition), migration history နဲ့ seeding data တွေရှိတဲ့ folder ပါ။
### 4. scripts
လောလောဆယ်တော့ jwt အတွက် private key & public key ကို generate လုပ်တဲ့ script တစ်ခုပဲရှိပါတယ်။ နောက်ပိုင်းတခြားဟာတွေ ထပ်တိုးဖို့ရှိလာရင် ဒီ folder ထဲမှာထပ်တိုးသွားပါ။ 
### 5. src
အထူးတလည်ပြောနေစရာမလိုတော့ပါဘူး။ အဓိကကျတဲ့ source folder ပါပဲ။ အထဲမှာတော့ ဒီလိုထပ်ခွဲထားပါတယ်။
- constants
- handlers - business logic တွေက ဒီထဲမှာရေးပါတယ်
- plugins - fastify ရဲ့ core plugins, ecosystem plugin တွေနဲ့ custom plugins တွေကို ဒီထဲမှာရေးပါတယ်
- routes - endpoints တွေနဲ့ handler တွေကို ဒီထဲမှာ map ပါတယ်
- schemas - field တစ်ခုချင်းစီရဲ့ validation rule တွေကို ဒီထဲမှာရေးပါတယ်
- utils - business logic မဟုတ်တဲ့ common function တေကို ဒီထဲမှာရေးပါတယ်

ဒီ project တစ်ခုလုံးရဲ့ entry point က index.ts ပါ။
