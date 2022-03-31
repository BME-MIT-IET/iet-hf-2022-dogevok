package sk.kasper.domain.usecase.launchdetail.impl

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import sk.kasper.domain.model.LaunchSite
import sk.kasper.domain.model.Response
import sk.kasper.domain.repository.LaunchSiteRepository
import sk.kasper.domain.usecase.launchdetail.GetLaunchSite
import sk.kasper.domain.utils.wrapToResponse
import javax.inject.Inject

internal class GetLaunchSiteImpl @Inject constructor(private val launchSiteRepository: LaunchSiteRepository) :
    GetLaunchSite {

    override suspend operator fun invoke(launchId: String): Response<LaunchSite> =
        withContext(Dispatchers.IO) {
            wrapToResponse { launchSiteRepository.getLaunchSite(launchId) }
        }

}