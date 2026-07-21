import AISettings from "../components/settings/AISettings";
import BrowserSettings from "../components/settings/BrowserSettings";
import AccountSettings from "../components/settings/AccountSettings";

const Settings = () => {

    return (

        <div className="grid lg:grid-cols-2 gap-8">

            <AccountSettings />

            <BrowserSettings />

            <AISettings />

        </div>

    );

};

export default Settings;