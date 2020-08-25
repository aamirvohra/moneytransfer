# Backbase Front End Assignment: Make A Transaction
- App Deployed to Firebase [here](https://bb-money-transfer-app.web.app/banking)
- Features implemented:
    - State Management
    - i18n (internationalization)
    - Overdraft protection (Currently won't throw error will log in console, won't allow to continue)
    - Form Reset after successful transfer
    - User Account Info being pulled from json.
    - Display transaction lists
    - Sort & filter transaction list in realtime
    - Sort function is maintained after sortBy value has changed
    - Source code committed to [Github](https://github.com/aamirvohra/moneytransfer)
    - On successful debit transaction, user account balance deducted accordingly.
    - Support added for lang queryparams, on providing correct value (en or fr) the app will be localized accordingly
        - https://bb-money-transfer-app.web.app/banking?lang=en
        - https://bb-money-transfer-app.web.app/banking?lang=fr
- Bonus Features not implemented
    - Test Coverage (didn't attempt)
    - a11y: WCAG level A
    

# Run Application

``npm i``

``ng serve``

# Application Structure

- Banking component is parent component of `transfer` and 'transaction-history-component.ts'
- On app init user, user are redirected to banking component
- Transfer component is responsible for the transfer view of the UI.
- History component is responsible for filtering/sorting of the transaction list.
- State management is used to facilitate the interaction of components, managing state and making sure 
data flows in a single direction.
