export enum ErrorMessage {
    DTO_VALIDATION_ERROR = 'DTO_VALIDATION_ERROR',
    USER_EMAIL_ALREADY_EXISTS = 'Ezzel az email-el már létezik felhasználó',
    PRODUCT_TITLE_ALREADY_EXISTS = 'Ezzel a névvel már van termék',
    NOT_A_VALID_CATEGORY = 'Nem érvényes kategória',
    DATABASE_ERROR = 'DATABASE_ERROR',
    NO_JWT_SECRET = 'NO_JWT_SECRET',
    INVALID_CREDENTIALS = 'Felhasználónév vagy jelszó hibás',
    INVALID_URL = 'URL formátum nem megfelelő',
    INVALID_NUMBER = 'Nem szám',
    INVALID_EMAIL = 'Email formátum nem megfelelő',
    UNAUTHORIZED = 'Nincs hozzáférésed'
}
