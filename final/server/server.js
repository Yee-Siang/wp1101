import WebSocket from "ws";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import User from "../model/user.js";
import Cost from "../model/cost.js";
import MemoApi from "./MemoBackend.js";
import learningApi from "./LearningBackend.js";
///////////////////////////////////////////////////////////////////////////////

/* 連接資料庫 */
dotenv.config();
if (!process.env.MONGO_URL) {
  console.error("Missing MONGO_URL!!");
  process.exit(1);
}
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (e) => {
  throw new Error("DBConnectionError" + e);
});
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(cors());
app.use(bodyParser.json());


/* 確定有連到資料庫 */
db.once("open", () => {
  console.log("MongoDB connected!");
  const PORT = process.env.port || 4000;
  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
});

///////////////////////////////////////////////////////////////////////////////
/* 代辦事項的 api */
MemoApi(app);
///////////////////////////////////////////////////////////////////////////////
/* 學習功能的 api */
learningApi(app);
///////////////////////////////////////////////////////////////////////////////
/* 註冊新用戶(3/4) */
app.post("/api/CreateNewUser", async (req, res) => {
  let SignupUserID = req.body.SignupUserID;
  let SignupUserPassword = req.body.SignupUserPassword;
  let SignupNickname = req.body.SignupNickname;
  let SignupSchool = req.body.SignupSchool;
  let SignupBirthday = req.body.SignupBirthday;
  let SignupAboutMe = req.body.SignupAboutMe;
  const [response, SignupStatus] = await SaveNewUser(
    SignupUserID,
    SignupUserPassword,
    SignupNickname,
    SignupSchool,
    SignupBirthday,
    SignupAboutMe
  );
  res.json({ Message: `${response}`, SignupSuccess: `${SignupStatus}` });
});

/* 註冊新用戶(4/4) */
const SaveNewUser = async (
  UserID,
  Password,
  Nickname,
  School,
  Birthday,
  AboutMe
) => {
  const existing = await User.findOne({ UserID: UserID });
  if (existing) {
    try {
      return [`Sorry , UserID: ${UserID} has repeated !!`, false];
    } catch (e) {
      throw new Error("User creation error" + e);
    }
  } else {
    console.log("BackendNowCreateNewUser");
    try {
      const newUser = new User({
        UserID,
        Password,
        Nickname,
        School,
        Birthday,
        AboutMe,
      });
      let nowreturn = newUser.save();
      console.log("BackendFinishCreateNewUser");
      return [
        `FrontendFinishCreateNewUser( ID: ${UserID} , PW: ${Password} , Nickname: ${Nickname} , School: ${School} )`,
        true,
      ];
    } catch (e) {
      throw new Error("User creation error" + e);
    }
  }
};

///////////////////////////////////////////////////////////////////////////////

/* 舊用戶登入(3/4) */
app.post("/api/UserLogin", async (req, res) => {
  let InputUserID = req.body.LoginUserID;
  let InputUserPassword = req.body.LoginUserPassword;
  const [
    response,
    LoginStatus,
    UserID,
    UserPassword,
    Nickname,
    School,
    Birthday,
    AboutMe,
  ] = await UserLogin(InputUserID, InputUserPassword);
  res.json({
    Message: `${response}`,
    LoginSuccess: `${LoginStatus}`,
    UserID: `${UserID}`,
    UserPassword: `${UserPassword}`,
    Nickname: `${Nickname}`,
    School: `${School}`,
    Birthday: `${Birthday}`,
    AboutMe: `${AboutMe}`,
  });
});

/* 舊用戶登入(4/4) */
const UserLogin = async (UserID, Password) => {
  const existing = await User.findOne({ UserID: UserID });
  console.log("BackendNowUserLogin");
  if (existing) {
    try {
      if (existing.Password === Password) {
        try {
          console.log("BackendFinishUserLogin");

          return [
            `Welcome back , ${UserID} !!`,
            true,
            existing.UserID,
            existing.Password,
            existing.Nickname,
            existing.School,
            existing.Birthday,
            existing.AboutMe,
          ];
        } catch (e) {
          throw new Error("User Login error" + e);
        }
      } else {
        try {
          return [
            `Sorry, you just entered the wrong password !!`,
            false,
            "",
            "",
            "",
            "",
            "",
            "",
          ];
        } catch (e) {
          throw new Error("User Login error" + e);
        }
      }
    } catch (e) {
      throw new Error("User Login error" + e);
    }
  } else {
    try {
      return [
        `Sorry , this UserID is not existing !!`,
        false,
        "",
        "",
        "",
        "",
        "",
        "",
      ];
    } catch (e) {
      throw new Error("User Login error" + e);
    }
  }
};

///////////////////////////////////////////////////////////////////////////////

/*刪除所有使用者(3/4)*/
app.delete("/api/DeleteAllUsers", async (req, res) => {
  const response = await DeleteUserDB();
  res.json({ Message: `${response}` });
});

/*刪除所有使用者(4/4)*/
const DeleteUserDB = async () => {
  try {
    console.log("BackendNowDeleteAllUser");
    await User.deleteMany({});
    console.log("BackendFinishDeleteAllUser");
    return `FrontendFinishDeleteAllUser`;
  } catch (e) {
    throw new Error("User database deletion failed" + e);
  }
};

///////////////////////////////////////////////////////////////////////////////

/* 修改個人資料(3/4) */
app.post("/api/ChangePersonalInfo", async (req, res) => {
  let NowUserID = req.body.NowUserID;
  let NewNickname = req.body.NewNickname;
  let NewSchool = req.body.NewSchool;
  let NewBirthday = req.body.NewBirthday;
  let NewAboutMe = req.body.NewAboutMe;
  const [response, ChangePersonalInfoStatus] = await ChangePersonalInfo(
    NowUserID,
    NewNickname,
    NewSchool,
    NewBirthday,
    NewAboutMe
  );
  res.json({
    Message: `${response}`,
    ChangePersonalInfoSuccess: `${ChangePersonalInfoStatus}`,
  });
});

/* 修改個人資料(4/4) */
const ChangePersonalInfo = async (
  UserID,
  NewNickname,
  NewSchool,
  NewBirthday,
  NewAboutMe
) => {
  const existing = await User.findOne({ UserID: UserID });
  console.log("BackendNowChangePersonalInfo");
  try {
    User.updateOne(
      { UserID: UserID },
      {
        Nickname: NewNickname,
        School: NewSchool,
        Birthday: NewBirthday,
        AboutMe: NewAboutMe,
      },
      function (err, res) { }
    );
    console.log("BackendFinishChangePersonalInfo");
    return ["You can check them in personalinfo page", true];
  } catch (e) {
    throw new Error("Change PersonalInfo error" + e);
  }
};

///////////////////////////////////////////////////////////////////////////////

/* 修改密碼(3/4) */
app.post("/api/ChangePassword", async (req, res) => {
  let InputUserID = req.body.NowUserID;
  let InputOldPassword = req.body.OldUserPassword;
  let InputNewPassword = req.body.NewUserPassword;
  const [response, ChangePasswordStatus] = await ChangePassword(
    InputUserID,
    InputOldPassword,
    InputNewPassword
  );
  res.json({
    Message: `${response}`,
    ChangePasswordSuccess: `${ChangePasswordStatus}`,
  });
});

/* 修改密碼(4/4) */
const ChangePassword = async (UserID, OldPassword, NewPassword) => {
  const existing = await User.findOne({ UserID: UserID });
  console.log("BackendNowChangePassword");
  try {
    if (existing.Password === OldPassword) {
      try {
        User.updateOne(
          { UserID: UserID },
          { Password: NewPassword },
          function (err, res) { }
        );
        console.log("BackendFinishChangePassword");
        return [`OldPW: ${OldPassword},NEWPW: ${NewPassword})`, true];
      } catch (e) {
        throw new Error("Change Password error" + e);
      }
    } else {
      try {
        return [`Wrong Password!!`, false];
      } catch (e) {
        throw new Error("Change Password error" + e);
      }
    }
  } catch (e) {
    throw new Error("Change Password error" + e);
  }
};

///////////////////////////////////////////////////////////////////////////////

/* 新增一筆記帳(3/4) */
app.post("/api/CreateNewCost", async (req, res) => {
  let NewCostUserID = req.body.NowUserID;
  let NewCostTitle = req.body.NewCostTitle;
  let NewCostIsOutcome = req.body.NewCostIsOutcome;
  let NewCostMoney = req.body.NewCostMoney;
  let NewCostTag = req.body.NewCostTag;
  let NewCostDay = req.body.NewCostDay;

  const [response, CreateNewCostStatus] = await SaveNewCost(
    NewCostUserID,
    NewCostTitle,
    NewCostIsOutcome,
    NewCostMoney,
    NewCostTag,
    NewCostDay
  );
  res.json({
    Message: `${response}`,
    CreateNewCostSuccess: `${CreateNewCostStatus}`,
  });
});

/* 新增一筆記帳(4/4) */
const SaveNewCost = async (UserID, Title, IsOutcome, Money, Tag, Day) => {
  console.log("BackendNowCreateNewCost");
  try {
    const newCost = new Cost({ UserID, Title, IsOutcome, Money, Tag, Day });
    let nowreturn = newCost.save();
    console.log("BackendFinishCreateNewCost");
    return [
      `ID: ${UserID} , Title: ${Title} , IsOutcome: ${IsOutcome} , Money: ${Money} , Tag: ${Tag}, Day: ${Day}`,
      true,
    ];
  } catch (e) {
    throw new Error("User creation error" + e);
  }
};

///////////////////////////////////////////////////////////////////////////////

/* 從資料庫取得目前使用者記帳紀錄(3/4) */
app.post("/api/CheckMyCost", async (req, res) => {
  let InputUserID = req.body.NowUserID;
  const [response, CheckMyCostStatus, AllMyCost] = await CheckMyCost(
    InputUserID
  );
  res.json({
    Message: `${response}`,
    CheckMyCostSuccess: `${CheckMyCostStatus}`,
    AllMyCost: AllMyCost,
  });
});

/* 從資料庫取得目前使用者記帳紀錄(4/4) */
const CheckMyCost = async (UserID) => {
  const existing = await Cost.find({ UserID: UserID });
  console.log("BackendNowCheckMyCost");
  if (existing) {
    try {
      console.log("BackendFinishCheckMyCost");
      return [` ${UserID} 's all cost are here  `, true, existing];
    } catch (e) {
      throw new Error("CheckMyCost error" + e);
    }
  } else {
    try {
      return [`UserID doesn't have any cost record !`, false, ""];
    } catch (e) {
      throw new Error("CheckMyCost error" + e);
    }
  }
};

///////////////////////////////////////////////////////////////////////////////

/*刪除個人所有記帳紀錄(3/4)*/
app.post("/api/DeleteMyCost", async (req, res) => {
  let NowUserID = req.body.NowUserID;
  const [response, DeleteMyCostStatus] = await DeleteMyCost(NowUserID);
  res.json({
    Message: `${response}`,
    DeleteMyCostSuccess: `${DeleteMyCostStatus}`,
  });
});

/*刪除個人所有記帳紀錄(4/4)*/
const DeleteMyCost = async (UserID) => {
  try {
    console.log(UserID);
    console.log("BackendNowDeleteMyCost");
    await Cost.deleteMany({ UserID: UserID });
    console.log("BackendFinishDeleteMyCost");
    return [`All my cost deleted`, true];
  } catch (e) {
    throw new Error("Cost  database deletion failed" + e);
  }
};

///////////////////////////////////////////////////////////////////////////////

/*刪除所有用戶所有記帳(3/4)*/
app.delete("/api/DeleteAllCosts", async (req, res) => {
  const response = await DeleteCostDB();
  res.json({ Message: `${response}` });
});

/*刪除所有用戶所有記帳(4/4)*/
const DeleteCostDB = async () => {
  try {
    console.log("BackendNowDeleteAllCost");
    await Cost.deleteMany({});
    console.log("BackendFinishDeleteAllCost");
    return `FrontendFinishDeleteAllCost`;
  } catch (e) {
    throw new Error("Cost  database deletion failed" + e);
  }
};
