目录结构

```
src
  langs
    en
      common.ts
      index.ts
    index.ts
  utils
    i18n.ts
```

src/langs/en/common.ts
```
export default {
  hello: "hello {label}",
  placeholder: {
    input: "Please input {label}"
  },
  button: {
    submit: "Submit"
  }
};
```

src/langs/en/index.ts
```
export { default as common } from "./common";
```

src/langs/index.ts
```
import * as EN from "./en/index";
import { LanguageType } from "@ue/i18n";

import type { Language as UeI18n } from "@ue/i18n";

export type Language = typeof EN & UeI18n;

export const Langs = {
  [LanguageType.en]: EN,
};
```

src/utils/i18n.ts
```
import I18n from "@ue/i18n";
import { Langs } from "src/langs/index";
import type { Language } from "src/langs/index";

const i18n = I18n<Language>();
i18n.append(Langs);
export default i18n;
```