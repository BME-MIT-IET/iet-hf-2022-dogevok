package sk.kasper.ui_common.rocket

import androidx.annotation.DrawableRes
import androidx.annotation.StringRes
import sk.kasper.ui_common.tag.FilterRocket

interface RocketMapper {

    @DrawableRes
    fun toDrawableRes(rocketId: Long?): Int

    @StringRes
    fun toStringRes(rocketId: Long?): Int

    fun toDomainRocket(rocket: FilterRocket): Long

}

fun interface MapRocketToDrawableRes {

    @DrawableRes
    fun map(rocketId: Long?): Int

}

fun interface MapRocketToStringRes {

    @StringRes
    operator fun invoke(rocketId: Long?): Int

}

fun interface MapFilterRocketToDomainRocket {

    @StringRes
    operator fun invoke(rocket: FilterRocket): Long

}