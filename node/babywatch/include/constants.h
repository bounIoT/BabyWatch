#ifndef CONSTANTS_H
#define CONSTANTS_H

#include "pins.h"
#include "secrets.h"

#ifndef SECRETS_H
#include "secrets.default.h"
#endif

extern char *HTTP_URL = "https://www.babywatch.ml/api/senddata";

extern unsigned long TIME_LIMIT = 60000;

#endif