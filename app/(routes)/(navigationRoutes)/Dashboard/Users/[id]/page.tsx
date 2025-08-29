
import UserDetailsContent from "../../../../../../components/user-profile/UserDetailsContent";
import UserProfileHeader from "../../../../../../components/user-profile/UserProfileHeader";
import styles from "./style.module.scss";
import BackButton from "../../../../../../components/utility_component/back-button";



export default  async function UserProfilePage({ params }: {params: Promise<{id: string}>}) {
  const { id } = await  params;


  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <BackButton/>
      </div>

      <div className={styles.actionContainer}>
        <strong>User Details</strong>
        <div className={styles.buttonsContainer}>
          <button type="button" className="">
            BLACKLIST USER
          </button>
          <button type="button" className="">
            ACTIVATE USER
          </button>
        </div>
      </div>
      <UserProfileHeader userId={id} />
      <UserDetailsContent userId={id} />
    </div>
  );
}
