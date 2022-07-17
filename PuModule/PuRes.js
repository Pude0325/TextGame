const fs = require("fs");

var PuRes = {
    keyRule : RegExp("^@[a-zA-Z_]*:"),
    classRule : RegExp(": *(s|n|b)"),
    valueRule : RegExp(":.*"),
    new : (path) => {
        let file = fs.readFileSync(path, 'utf-8');
        let t = file.split('\n');
        let ru_k = [];
        let ru_v = [];
        let ru_c = [];
        let ru = {};
        for (let s in t) {
            let ru_i = PuRes.keyRule.exec(t[s]);
            if (t[s][0] != "@") return;
            ru_k.push(ru_i[0].replace(':','').replace('@',''))
        }
        for (let s in t) {
            let ru_i_c = PuRes.classRule.exec(t[s])[0].replace(':', '').replace(RegExp(" *"), '');
            ru_c.push(ru_i_c);
            if (ru_i_c == "s") {
                let rule = RegExp("\".*\"");
                ru_v.push(rule.exec(t[s])[0].replace('"', "").replace('"', ""));
            }
            else if (ru_i_c == 'b') {
                let rule = RegExp("\".*\"");
                bool = rule.exec(t[s])[0].match(RegExp("(true|True|false|False)"))[0];
                switch (bool) {
                    case "true":
                    case "True":
                        ru_v.push(true);
                        break;
                    case "false":
                    case "False":
                        ru_v.push(false);
                        break;
                }
            }
            else if (ru_i_c == 'n') {
                let rule = RegExp("\".*\"");
                int = rule.exec(t[s])[0].replace('"', "").replace('"', "");
                ru_v.push(Number(int));
            }
            
            for (let i in ru_k) {
                ru[ru_k[i]] = ru_v[i]
            }
        }
        return ru;
    }
}

module.exports = PuRes;