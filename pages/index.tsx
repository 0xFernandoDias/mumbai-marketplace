import {
	ConnectWallet,
	MediaRenderer,
	useActiveListings,
	useContract,
} from "@thirdweb-dev/react"
import type { NextPage } from "next"
import styles from "../styles/Home.module.css"
import { BigNumber } from "ethers"

const Home: NextPage = () => {
	const { contract } = useContract(
		"0xC09c8C5ceE4ade0182c084657540473865a7D82f",
		"marketplace"
	)

	const { data: nfts, isLoading } = useActiveListings(contract)

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1>Mumbai Marketplace</h1>
				<ConnectWallet />
				{!isLoading ? (
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							maxWidth: "80%",
							gap: "10%",
							justifyContent: "center",
							margin: "16px",
						}}
					>
						{nfts &&
							nfts.map((nft) => {
								return (
									<div key={nft.id} style={{ margin: "16px" }}>
										<MediaRenderer
											src={nft.asset.image}
											height="200px"
											width="200px"
										/>
										<p>{nft.asset.name}</p>
										<p>
											Price: {nft.buyoutCurrencyValuePerToken.displayValue}{" "}
											MATIC
										</p>
										<button
											type="button"
											onClick={async () => {
												try {
													await contract?.buyoutListing(
														BigNumber.from(nft.id),
														1
													)
												} catch (error) {
													console.error(error)
													alert(error)
												}
											}}
										>
											Buy Now
										</button>
									</div>
								)
							})}
					</div>
				) : (
					<div>...Loading</div>
				)}
			</main>
		</div>
	)
}

export default Home
